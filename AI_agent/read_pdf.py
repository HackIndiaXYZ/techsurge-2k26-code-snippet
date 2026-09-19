import os
import sys
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

reconfig = getattr(sys.stdout, "reconfigure", None)
if callable(reconfig):
    try:
        reconfig(encoding="utf-8")
    except Exception:
        pass

current_dir = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(current_dir, "KNOWLEDGE_BASE.pdf")

if not os.path.exists(pdf_path):
    print(f"[!] '{pdf_path}' not found!")
    sys.exit(1)

# 1. Load the PDF pages
loader = PyPDFLoader(pdf_path)
documents = loader.load()
print(f"[+] Successfully loaded {len(documents)} pages.")

# 2. Split pages into smaller overlapping chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,        # characters per chunk
    chunk_overlap=50,      # overlap prevents cutting concepts mid-sentence
    separators=["\n\n", "\n", " ", ""]
)
chunks = text_splitter.split_documents(documents)
print(f"[+] Split into {len(chunks)} chunks.")

# Preview the first chunk
if chunks:
    print("\n--- Example Chunk 1 ---")
    print(chunks[0].page_content)
    print("Metadata:", chunks[0].metadata)

# 3. Initialize Gemini embeddings
# Automatically uses GEMINI_API_KEY from .env
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")

# 4. Store chunks into local Chroma vector database
persist_dir = os.path.join(current_dir, "chroma_db")
print(f"[*] Embedding {len(chunks)} chunks into Chroma DB at: {persist_dir} ...")

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory=persist_dir
)
print("[+] Knowledge base successfully embedded and persisted in ./chroma_db!")

