# Using langchain-community or pypdf
from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("company_policy.pdf")
documents = loader.load()