---
title: "Generative AI & LangChain Architecture: From Fundamentals to Autonomous Agents"
date: "2026-02-11"
excerpt: "A practical engineering handbook for building modern LLM-powered applications using LangChain, RAG, and autonomous agents."
author: "Manjeet Kumar"
readTime: "25 min read"
tags: ["Generative AI", "LangChain", "LLMs", "Python", "RAG"]
category: "AI & ML"
featured: true
sequence: 1
---

# Generative AI & LangChain Architecture: From Fundamentals to Autonomous Agents

*A Practical Engineering Handbook for Building Modern LLM-Powered Applications*

---

## Preface

Welcome to *Generative AI & LangChain Architecture*. This handbook is designed for developers, software architects, and machine learning engineers who want to go beyond simple API prompts and build robust, production-grade Generative AI applications.

Rather than treating Artificial Intelligence as a black box, this book provides a clean breakdown of how Large Language Models (LLMs) operate, how data is processed via tokenization and context windows, and how open-source frameworks like **LangChain** enable developers to orchestrate Retrieval-Augmented Generation (RAG), tool execution, and autonomous agents.

Every chapter includes **Step-by-Step Hands-On Code Labs** derived from production code implementations, enabling you to build, test, and deploy practical AI systems directly as you read.

---

## Table of Contents

- [Preface](#preface)
- [PART I: FUNDAMENTALS OF GENERATIVE AI](#part-i-fundamentals-of-generative-ai)
  - [Chapter 1: Introduction to Generative AI](#chapter-1-introduction-to-generative-ai)
    - [1.1 What is Generative AI?](#11-what-is-generative-ai)
    - [1.2 Modalities of Generative Output](#12-modalities-of-generative-output)
    - [1.3 Input-Output Paradigms](#13-input-output-paradigms)
  - [Chapter 2: Demystifying Large Language Models (LLMs)](#chapter-2-demystifying-large-language-models-llms)
    - [2.1 Core Concepts of LLMs](#21-core-concepts-of-llms)
    - [2.2 Tasks Performed by LLMs](#22-tasks-performed-by-llms)
    - [2.3 An Interactive Example](#23-an-interactive-example)
  - [Chapter 3: Tokens and Context Windows](#chapter-3-tokens-and-context-windows)
    - [3.1 Understanding Tokens](#31-understanding-tokens)
    - [3.2 The Anatomy of a Context Window](#32-the-anatomy-of-a-context-window)
- [PART II: MODERN LLM ECOSYSTEM & DIRECT INTEGRATIONS](#part-ii-modern-llm-ecosystem--direct-integrations)
  - [Chapter 4: The Landscape of Modern Models](#chapter-4-the-landscape-of-modern-models)
    - [4.1 Proprietary Model Families](#41-proprietary-model-families)
    - [4.2 Open-Weight & Open-Source Models](#42-open-weight--open-source-models)
  - [Chapter 5: Building Native Python LLM Applications](#chapter-5-building-native-python-llm-applications)
    - [5.1 Continuous Prompt-Response Chat Loops](#51-continuous-prompt-response-chat-loops)
    - [5.2 Application Architecture Flow](#52-application-architecture-flow)
- [PART III: THE LANGCHAIN FRAMEWORK & PRIMITIVES](#part-iii-the-langchain-framework--primitives)
  - [Chapter 6: Why LangChain?](#chapter-6-why-langchain)
    - [6.1 What is LangChain?](#61-what-is-langchain)
    - [6.2 Solving Real-World Complexity: The PDF Q&A Pipeline](#62-solving-real-world-complexity-the-pdf-qa-pipeline)
    - [6.3 Architecture Comparison: Custom Code vs. LangChain](#63-architecture-comparison-custom-code-vs-langchain)
    - [6.4 Core Advantages of LangChain](#64-core-advantages-of-langchain)
  - [Chapter 7: LangChain Taxonomy & Primitive Components](#chapter-7-langchain-taxonomy--primitive-components)
    - [7.1 The LangChain Component Taxonomy](#71-the-langchain-component-taxonomy)
    - [7.2 Models](#72-models)
    - [7.3 Prompts](#73-prompts)
    - [7.4 Messages](#74-messages)
      - [7.4.1 Real-World Application: Stateful Multi-Turn Messaging](#741-real-world-application-stateful-multi-turn-messaging)
    - [7.5 Output Parsers](#75-output-parsers)
  - [Chapter 8: Document Processing & Retrieval Pipelines](#chapter-8-document-processing--retrieval-pipelines)
    - [8.1 Documents & Metadata](#81-documents--metadata)
    - [8.2 Document Loaders](#82-document-loaders)
      - [Lab 8.2.1: Ingesting PDFs with PyPDFLoader (`pdf.py`)](#lab-821-ingesting-pdfs-with-pypdfloader-pdfpy)
      - [Lab 8.2.2: Ingesting Text Files with TextLoader (`text.py`)](#lab-822-ingesting-text-files-with-textloader-textpy)
      - [Lab 8.2.3: Web Scraping with WebBaseLoader (`web.py`)](#lab-823-web-scraping-with-webbaseloader-webpy)
    - [8.3 Text Splitters & Chunking Strategies](#83-text-splitters--chunking-strategies)
      - [Lab 8.3.1: Character-Based Splitting (`text-splitter.py`)](#lab-831-character-based-splitting-text-splitterpy)
      - [Lab 8.3.2: Recursive Character Splitting (`recurse.splitter.py`)](#lab-832-recursive-character-splitting-recursesplitterpy)
      - [Lab 8.3.3: Token-Based Splitting (`token-splitter.py`)](#lab-833-token-based-splitting-token-splitterpy)
  - [Chapter 9: Vector Embeddings, Stores, and Retrievers](#chapter-9-vector-embeddings-stores-and-retrievers)
    - [9.1 Vector Embeddings](#91-vector-embeddings)
    - [9.2 Vector Stores](#92-vector-stores)
      - [Lab 9.2.1: Building & Persisting a Chroma Vector DB (`createdb.py`)](#lab-921-building--persisting-a-chroma-vector-db-createdbpy)
      - [Lab 9.2.2: Direct Similarity Searching (`db.py`)](#lab-922-direct-similarity-searching-dbpy)
    - [9.3 Retrievers & Advanced Search Strategies](#93-retrievers--advanced-search-strategies)
      - [Lab 9.3.1: Similarity Search vs. Maximal Marginal Relevance (`mmr.py`)](#lab-931-similarity-search-vs-maximal-marginal-relevance-mmrpy)
      - [Lab 9.3.2: Multi-Query Retrieval with LLM Query Expansion (`multiquery.py`)](#lab-932-multi-query-retrieval-with-llm-query-expansion-multiquerypy)
      - [Lab 9.3.3: External Academic Document Retrieval (`ret_arxiv.py`)](#lab-933-external-academic-document-retrieval-ret_arxivpy)
- [PART IV: ADVANCED ORCHESTRATION & AGENTS](#part-iv-advanced-orchestration--agents)
  - [Chapter 10: LangChain Expression Language (LCEL) & Advanced Runnables](#chapter-10-langchain-expression-language-lcel--advanced-runnables)
    - [10.1 Composition with Runnables](#101-composition-with-runnables)
    - [10.2 Runnable Primitives & Execution Mechanics](#102-runnable-primitives--execution-mechanics)
      - [Lab 10.2.1: Sequential Chains with `|` Operator (`sqqunce.py`)](#lab-1021-sequential-chains-with--operator-sqquncepy)
      - [Lab 10.2.2: Parallel Execution with `RunnableParallel` & `RunnableLambda` (`parallel.py`)](#lab-1022-parallel-execution-with-runnableparallel--runnablelambda-parallelpy)
      - [Lab 10.2.3: Data Passthrough with `RunnablePassthrough` (`passthroughr.py`)](#lab-1023-data-passthrough-with-runnablepassthrough-passthroughrpy)
  - [Chapter 11: Tools and Autonomous Agents](#chapter-11-tools-and-autonomous-agents)
    - [11.1 Equipping Models with Tools](#111-equipping-models-with-tools)
    - [11.2 Autonomous Agents](#112-autonomous-agents)
    - [11.3 Chains vs. Agents](#113-chains-vs-agents)
  - [Chapter 12: Complete End-to-End Application Architectures](#chapter-12-complete-end-to-end-application-architectures)
    - [12.1 Architectural Flow Diagrams](#121-architectural-flow-diagrams)
    - [12.2 Practical Code Implementation Guide](#122-practical-code-implementation-guide)
    - [12.3 Full Web UI Implementation: Streamlit & LangChain Chat Assistant (`ui.py`)](#123-full-web-ui-implementation-streamlit--langchain-chat-assistant-uipy)
    - [12.4 Full Production CLI RAG System (`main.py`)](#124-full-production-cli-rag-system-mainpy)
- [APPENDICES](#appendices)
  - [Appendix A: Essential Terminology Quick Reference](#appendix-a-essential-terminology-quick-reference)
  - [Appendix B: The Big Picture & Recommended Learning Roadmap](#appendix-b-the-big-picture--recommended-learning-roadmap)

---

# PART I: FUNDAMENTALS OF GENERATIVE AI

## Chapter 1: Introduction to Generative AI

### 1.1 What is Generative AI?

**Generative Artificial Intelligence (GenAI)** represents a paradigm shift in machine learning. Unlike traditional discriminative models—which focus primarily on classifying data, predicting numeric outputs, or detecting anomalies—Generative AI algorithms analyze vast datasets to synthesize completely new, original content that mirrors human intelligence and creativity.

> [!NOTE]
> At its core, Generative AI models receive context or instructions provided by a user (known as a *prompt*) and predict the most logical, high-probability continuation across structured or unstructured modalities.

### 1.2 Modalities of Generative Output

Modern GenAI platforms are multimodal and capable of generating rich outputs across a wide spectrum of formats:

- **Text**: Articles, documentation, creative stories, and technical specifications.
- **Images**: Photorealistic artwork, UI wireframes, design mockups, and diagrams.
- **Audio**: Speech synthesis, sound effects, voice cloning, and musical compositions.
- **Video**: Dynamic synthetic animation, high-definition clip generation, and video editing.
- **Code**: Multi-language software engineering routines, bug fixes, SQL transformations, and refactoring scripts.
- **Documents & Summaries**: Executive briefings, legal document parsing, and condensed research notes.
- **Conversations**: Context-aware dialogue, virtual agent interactions, and customer support flows.

### 1.3 Input-Output Paradigms

To understand how GenAI interfaces with end users, consider a simple text generation request.

#### User Input (Prompt)
```text
Write a professional email asking for leave.
```

#### Synthetic AI Output
```text
Subject: Leave Request - [Your Name]

Dear Manager,

I would like to request formal leave for two days, starting from [Start Date] to [End Date], due to personal reasons. I will ensure all my current pending tasks are wrapped up prior to my departure, and I will be reachable via email for any urgent matters.

Thank you for your understanding.

Best regards,
[Your Name]
```

---

## Chapter 2: Demystifying Large Language Models (LLMs)

### 2.1 Core Concepts of LLMs

The technological centerpiece of modern text-based Generative AI is the **Large Language Model (LLM)**. 

An LLM is a specialized machine learning model (typically based on the Transformer architecture) trained on massive corpora of web text, books, code repositories, and articles. Through self-supervised training on billions of parameters, an LLM learns the deep statistical patterns, semantic relationships, and logical structures of human language.

### 2.2 Tasks Performed by LLMs

LLMs are general-purpose reasoners capable of executing an extensive array of natural language processing (NLP) tasks out of the box:

1. **Question Answering**: Retrieving facts and explaining technical concepts.
2. **Text Generation**: Drafting essays, documentation, emails, and narratives.
3. **Summarization**: Condensing lengthy reports into actionable summaries.
4. **Translation**: Converting text seamlessly across human and programming languages.
5. **Code Generation & Debugging**: Writing functions, explaining complex scripts, and identifying syntax bugs.
6. **Classification**: Categorizing support tickets, analyzing sentiment, and tagging data.
7. **Information Extraction**: Extracting structured entities (e.g., JSON) from unformatted text.
8. **Reasoning & Planning**: Breaking down complex tasks into logical multi-step execution plans.
9. **Chatbots & Conversational Agents**: Maintaining contextual dialogue with users across multiple turns.

### 2.3 An Interactive Example

#### User Prompt
```text
Explain recursion in simple words.
```

#### LLM Response
```text
Recursion is a programming technique where a function calls itself to solve a smaller version of the same problem, continuing until it reaches a simple "base case" that stops the loop.
```

---

## Chapter 3: Tokens and Context Windows

### 3.1 Understanding Tokens

Large Language Models do not read raw strings or words directly as humans do. Instead, text is transformed into numerical vectors via subword tokenization. A **token** is the fundamental atomic unit of information processed by an LLM.

```text
Input String:  "Hello, how are you?"
Token Split:  ["Hello", ",", " how", " are", " you", "?"]
```

> [!IMPORTANT]
> A token is not strictly a single word. Depending on the model's tokenizer dictionary:
> - A token can be a complete word (e.g., `"Hello"`).
> - A token can be a subword fragment (e.g., `"un"`, `"believ"`, `"able"`).
> - A token can be a punctuation mark (e.g., `","`, `"?"`).
> - A token can represent spaces or special characters.

### 3.2 The Anatomy of a Context Window

The **Context Window** represents the total volume of tokenized information an LLM can retain and process in a single inference call.

```text
┌────────────────────────────────────────────────────────┐
│                     CONTEXT WINDOW                     │
│ ┌────────────────────────────────────────────────────┐ │
│ │ System Instructions                                │ │
│ ├────────────────────────────────────────────────────┤ │
│ │ Conversation History                               │ │
│ ├────────────────────────────────────────────────────┤ │
│ │ User Prompt                                        │ │
│ ├────────────────────────────────────────────────────┤ │
│ │ Retrieved Documents & Context                      │ │
│ ├────────────────────────────────────────────────────┤ │
│ │ Previous AI Responses                              │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

Varying model architectures offer distinct context window limits, ranging from 4,000 tokens up to millions of tokens. Selecting a model with an appropriate context size is crucial when passing large codebases, manuals, or long conversation histories.

---

# PART II: MODERN LLM ECOSYSTEM & DIRECT INTEGRATIONS

## Chapter 4: The Landscape of Modern Models

The modern Generative AI ecosystem comprises both proprietary API-driven models and open-weight architectures available for self-hosting.

### 4.1 Proprietary Model Families

#### 1. OpenAI (GPT Series)
- **Flagship Families**: GPT-4o, GPT-4o-mini, o1.
- **Key Strengths**: Advanced reasoning, complex code generation, dynamic tool calling, and low-latency interaction.

```python
from openai import OpenAI

# Initialize client
client = OpenAI()

# Send API request
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain what is a Large Language Model in simple terms."}
    ],
)

# Print response content
print(response.choices[0].message.content)
```

#### 2. Google (Gemini Series)
- **Flagship Families**: Gemini 1.5 Pro, Gemini 1.5 Flash.
- **Key Strengths**: Massive context windows (up to 2M tokens), multimodal processing (video, audio, text), and document understanding.

```python
import os
import google.generativeai as genai

# Configure API Key
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Initialize model
model = genai.GenerativeModel("gemini-1.5-flash")

# Generate content
response = model.generate_content("Explain what is a Large Language Model in simple terms.")

print(response.text)
```

#### 3. Anthropic (Claude Series)
- **Flagship Families**: Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku.
- **Key Strengths**: Exceptional software development, long-context reasoning, document parsing, and safety alignment.

```python
import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

response = client.messages.create(
    model="claude-3-5-sonnet-latest",
    max_tokens=300,
    messages=[
        {"role": "user", "content": "Explain what is a Large Language Model in simple terms."}
    ],
)

print(response.content[0].text)
```

### 4.2 Open-Weight & Open-Source Models

In addition to proprietary managed endpoints, developer communities rely heavily on open-weight foundation models:

- **Meta Llama**: The premier family of open-weight models (e.g., Llama 3), widely deployed for self-hosted enterprise setups and fine-tuning.
- **Mistral AI**: Highly performant open models (e.g., Mistral 7B, Mixtral 8x7B) optimized for rapid inference, coding, and private cloud hosting.
- **Other Key Families**:
  - **Qwen**: High-capability open models tailored for coding, math, and multilingual tasks.
  - **DeepSeek**: Open models specialized in mathematical reasoning, coding logic, and efficient architecture design.
  - **Gemma**: Light-weight, open models built by Google for local developer experimentation.
  - **Phi**: Compact, high-efficiency small language models (SLMs) from Microsoft.
  - **Command**: Cohere's enterprise-focused models optimized for retrieval and tool usage.

---

## Chapter 5: Building Native Python LLM Applications

### 5.1 Continuous Prompt-Response Chat Loops

Developers can build basic interactive terminal applications by querying model APIs in a continuous loop.

```python
from openai import OpenAI

client = OpenAI()

print("--- AI Chatbot Initialized (Type 'exit' to quit) ---")

while True:
    prompt = input("\nYou: ")
    
    if prompt.lower() == "exit":
        print("Goodbye!")
        break
        
    response = client.responses.create(
        model="YOUR_MODEL",
        input=prompt
    )
    
    print("AI:", response.output_text)
```

### 5.2 Application Architecture Flow

The data flow for a basic native application follows a straightforward synchronous pipeline:

```text
┌───────────────┐
│     User      │
└───────┬───────┘
        │
        ↓
┌───────────────┐
│ Python App    │
└───────┬───────┘
        │
        ↓
┌───────────────┐
│   LLM API     │
└───────┬───────┘
        │
        ↓
┌───────────────┐
│ LLM Model     │
└───────┬───────┘
        │
        ↓
   AI Response
```

---

# PART III: THE LANGCHAIN FRAMEWORK & PRIMITIVES

## Chapter 6: Why LangChain?

### 6.1 What is LangChain?

**LangChain** is an open-source framework designed to simplify the construction of applications powered by language models. It provides standard abstractions, unified interfaces, and reusable building blocks for integrating LLMs with external data sources, memory, databases, and custom tools.

### 6.2 Solving Real-World Complexity: The PDF Q&A Pipeline

While sending a single prompt directly to an API endpoint is trivial, production GenAI applications require complex operational pipelines. Consider building an enterprise application that answers questions based on internal PDF documentation:

```text
PDF Document
     │
     ↓
 Extract Raw Text
     │
     ↓
 Split Text into Chunks
     │
     ↓
 Generate Vector Embeddings
     │
     ↓
 Store Vectors in Vector Database
     │
     ↓
 Query Similarity & Retrieve Relevant Chunks
     │
     ↓
 Inject Context into Prompt & Call LLM
     │
     ↓
 Generate Final Answer
```

Implementing this complete workflow manually requires writing custom parsers, vector database connectors, embedding pipeline logic, and prompt formatters. Frameworks like LangChain abstract away this glue code.

### 6.3 Architecture Comparison: Custom Code vs. LangChain

#### Custom Application Architecture (Without LangChain)
```text
Python Application
  ↓
Direct LLM API Call
  ↓
Custom File Parsing Code
  ↓
Custom Database Queries
  ↓
Custom Search Logic
  ↓
Custom Prompt Structuring
  ↓
Raw LLM Response
```

#### Standardized Framework Architecture (With LangChain)
```text
                      LangChain Framework
                               │
         ┌─────────────────────┼─────────────────────┐
         ↓                     ↓                     ↓
    Model Layer         Retrieval Layer         Tools Layer
         │                     │                     │
         ↓                     ↓                     ↓
     LLM APIs             Vector Databases       External APIs
```

### 6.4 Core Advantages of LangChain

1. **Standardized Model Integrations**: Switch between OpenAI, Google, Anthropic, Mistral, and Hugging Face via unified class interfaces without rewriting application logic.
2. **Robust Prompt Management**: Create, parameterize, and version reusable prompt templates cleanly.
3. **Automated Document Processing**: Built-in loaders for PDFs, text files, CSVs, JSON, Word files, and web scraping.
4. **First-Class RAG Utilities**: Seamless pipelines connecting document chunkers, embedding models, vector indices, and context retrievers.
5. **Tool & Agent Ecosystem**: Bind models directly to external tools (calculators, web search APIs, SQL databases, Python interpreters).

---

## Chapter 7: LangChain Taxonomy & Primitive Components

### 7.1 The LangChain Component Taxonomy

LangChain structures its library into core module primitives:

```text
LangChain Architecture
│
├── Models (LLMs & Chat Models)
├── Prompts (Templates & Selectors)
├── Messages (System, Human, AI Roles)
├── Output Parsers (Structuring Output)
├── Documents (Data Containers)
├── Document Loaders (Ingestion)
├── Text Splitters (Chunking Logic)
├── Embeddings (Vector Generation)
├── Vector Stores (Index Storage)
├── Retrievers (Search Interfaces)
├── Tools (External Integrations)
├── Agents (Autonomous Decision Makers)
└── Chains / Runnables (Pipeline Orchestration)
```

### 7.2 Models

Models represent the computational foundation. LangChain distinguishes between standard text completion LLMs and structured Chat Models.

```python
from langchain_mistralai import ChatMistralAI

# Initialize a chat model
model = ChatMistralAI(model="YOUR_MODEL")

# Invoke model with a query
response = model.invoke("Explain RAG in simple words.")

print(response.content)
```

### 7.3 Prompts

A **Prompt Template** enables developers to turn raw text instructions into dynamically parameterized strings.

#### Basic Prompt
```text
Explain Python.
```

#### Reusable Parameterized Prompt Template
```python
from langchain_core.prompts import ChatPromptTemplate

# Define prompt with variable placeholders
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful Python teacher."),
    ("human", "Explain {topic} in simple language with code snippets.")
])

# Inject runtime variables
messages = prompt.invoke({"topic": "recursion"})
```

### 7.4 Messages

Chat models operate on structured message roles:

- **SystemMessage**: Defines global behavior, personality, or instruction guidelines for the model.
- **HumanMessage**: Represents the input sent from the human user.
- **AIMessage**: Represents the previous response returned by the language model.

```text
┌───────────────────────┐
│     SystemMessage     │
└───────────┬───────────┘
            │
            ↓
┌───────────────────────┐
│     HumanMessage      │
└───────────┬───────────┘
            │
            ↓
┌───────────────────────┐
│       AIMessage       │
└───────────┬───────────┘
            │
            ↓
┌───────────────────────┐
│     HumanMessage      │
└───────────────────────┘
```

#### 7.4.1 Real-World Application: Stateful Multi-Turn Messaging

In practical web applications, chat models maintain multi-turn history by passing an array of LangChain message instances (`SystemMessage`, `HumanMessage`, `AIMessage`) to `model.invoke()`. 

Below is a snippet demonstrating stateful message management in a web interface:

```python
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_mistralai import ChatMistralAI

model = ChatMistralAI(model="mistral-medium-3-5")

# Initialize message history array
messages = [
    SystemMessage(content="You are a joke assistant and always give funny replies.")
]

# Append user query
messages.append(HumanMessage(content="Tell me a joke about Python programming."))

# Invoke model with full history
response = model.invoke(messages)

# Store assistant response back into history
messages.append(AIMessage(content=response.content))
```

### 7.5 Output Parsers

LLMs generate unstructured text or `AIMessage` objects by default. An **Output Parser** extracts and transforms raw model output into a clean, usable format (such as a plain string, dictionary, or JSON object).

```text
Raw Model AIMessage / String Output
               │
               ↓
         Output Parser
               │
               ↓
    Clean Python String / JSON
```

#### Simple Practical Demonstration

```python
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

# Initialize Chat Model
model = ChatMistralAI(model="mistral-small-2603")

# Step 1: Call model directly (Returns an AIMessage object)
response = model.invoke("Explain output parsers in simple words.")

print("Raw Response Type:", type(response))
# Output: <class 'langchain_core.messages.ai.AIMessage'>

# Step 2: Use Output Parser to convert AIMessage content into a plain string
parser = StrOutputParser()
clean_text = parser.parse(response.content)

print("\nParsed Text Type:", type(clean_text))
# Output: <class 'str'>

print("\nClean Parsed Output:\n", clean_text)
```

---

## Chapter 8: Document Processing & Retrieval Pipelines

### 8.1 Documents & Metadata

In LangChain, text data ingested from external sources is standardized as a `Document` object containing `page_content` and `metadata`:

```python
from langchain_core.documents import Document

doc = Document(
    page_content="Generative AI models process text using subword tokens.",
    metadata={
        "source": "genai_notes.pdf",
        "page": 1,
        "author": "Engineering Team"
    }
)
```

### 8.2 Document Loaders

Document Loaders handle the ingestion of raw content across distinct file formats into unified `Document` lists.

#### Lab 8.2.1: Ingesting PDFs with PyPDFLoader (`pdf.py`)

This lab demonstrates how to load PDF pages and summarize content using an LLM.

```python
# File: rag/document-loader/pdf.py
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_mistralai import ChatMistralAI

load_dotenv()

# Load PDF file
loader = PyPDFLoader("document-loader/p.pdf")
pages = loader.load()

# Extract text from page 1
docs = pages[0].page_content

# Create summarization prompt
prompt_template = ChatPromptTemplate.from_messages([
    ('system', 'You are a text summarizer.'),
    ('human', '{data}')
])

# Initialize model & invoke
model = ChatMistralAI(model='mistral-small-2603')
prompt = prompt_template.format_messages(data=docs)
res = model.invoke(prompt)

print(res.content)
```

#### Lab 8.2.2: Ingesting Text Files with TextLoader (`text.py`)

This lab demonstrates reading local text files with explicit UTF-8 encoding.

```python
# File: rag/document-loader/text.py
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_mistralai import ChatMistralAI

load_dotenv()

# Load text file with explicit encoding
loader = TextLoader("requirement.txt", encoding='utf-8')
docs = loader.load()

prompt_template = ChatPromptTemplate.from_messages([
    ('system', "You are an AI that helps summarize text in plain text format."),
    ("human", "{data}")
])

model = ChatMistralAI(model='mistral-small-2603')
prompt = prompt_template.format_messages(data=docs[0].page_content)

res = model.invoke(prompt)
print(res.content)
```

#### Lab 8.2.3: Web Scraping with WebBaseLoader (`web.py`)

This lab demonstrates extracting unstructured web page content into a clean document string.

```python
# File: rag/document-loader/web.py
from langchain_community.document_loaders import WebBaseLoader

# Load and scrape target URL
loader = WebBaseLoader("https://www.geeksforgeeks.org/python-programming-language/")
data = loader.load()[0].page_content

print(data[:500])  # Print first 500 characters
```

---

### 8.3 Text Splitters & Chunking Strategies

Passing massive documents directly to LLMs is inefficient. Text Splitters divide long strings into clean, overlapping chunks.

#### Lab 8.3.1: Character-Based Splitting (`text-splitter.py`)

Separates document text on a specific character separator (e.g., newline `\n`).

```python
# File: rag/document-loader/text-splitter.py
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter

load_dotenv()

docs = TextLoader("requirement.txt", encoding='utf-8').load()

# Split based on character separator
splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=10,
    chunk_overlap=2
)

chunks = splitter.split_documents(docs)
print("Total Chunks Created:", len(chunks))
```

#### Lab 8.3.2: Recursive Character Splitting (`recurse.splitter.py`)

Recursively attempts separators (`"\n\n"`, `"\n"`, `" "`, `""`) to keep paragraphs and sentences together.

```python
# File: rag/document-loader/recurse.splitter.py
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

pdfdata = PyPDFLoader('document-loader/p.pdf').load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=100,
    chunk_overlap=20
)

chunks = splitter.split_documents(pdfdata)
print("Total Chunks Created:", len(chunks))
```

#### Lab 8.3.3: Token-Based Splitting (`token-splitter.py`)

Ensures chunks do not exceed token count limits.

```python
# File: rag/document-loader/token-splitter.py
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import TokenTextSplitter

load_dotenv()

docs = TextLoader("requirement.txt", encoding='utf-8').load()

splitter = TokenTextSplitter(
    chunk_size=10,
    chunk_overlap=2
)

chunks = splitter.split_documents(docs)
print("First Token Chunk:", chunks[0])
```

---

# Chapter 9: Vector Embeddings, Stores, and Retrievers

### 9.1 Vector Embeddings

An **Embedding Model** transforms textual strings into high-dimensional dense numerical vectors capturing semantic meaning.

```text
"Python is a programming language" ──► [0.12, -0.45, 0.83, 0.21, ...]
```

### 9.2 Vector Stores

A **Vector Store** indexes and stores vector embeddings to enable similarity search.

#### Lab 9.2.1: Building & Persisting a Chroma Vector DB (`createdb.py`)

This practical exercise demonstrates reading a document, splitting it into chunks, calculating embeddings, and persisting the resulting Chroma database to local disk (`"m"` folder).

```python
# File: rag/vectorstore/createdb.py
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_mistralai import MistralAIEmbeddings
from langchain_chroma import Chroma

load_dotenv()

# Step 1: Load Document
raw_docs = TextLoader("docs.md", encoding='utf-8').load()

# Step 2: Split Into Chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = splitter.split_documents(raw_docs)

# Step 3: Initialize Embedding Model
embeddings = MistralAIEmbeddings(model="mistral-embed")

# Step 4: Build & Persist Chroma Database
vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="m"
)

print("Chroma database successfully created and persisted in folder 'm'.")
```

#### Lab 9.2.2: Direct Similarity Searching (`db.py`)

This lab demonstrates querying a persisted vector store for top matching documents using cosine similarity.

```python
# File: rag/vectorstore/db.py
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_mistralai import MistralAIEmbeddings
from langchain_community.vectorstores import Chroma

load_dotenv()

pdf_data = PyPDFLoader("docs/p.pdf").load()
embeddings = MistralAIEmbeddings(model="mistral-embed")

vector_store = Chroma.from_documents(
    documents=pdf_data,
    embedding=embeddings,
    persist_directory="chroma_db"
)

# Perform similarity search for top 1 result
result = vector_store.similarity_search("what is the name of candidate", k=1)
print("Top Relevant Match:", result)
```

---

### 9.3 Retrievers & Advanced Search Strategies

#### Lab 9.3.1: Similarity Search vs. Maximal Marginal Relevance (`mmr.py`)

Standard similarity search returns documents that are mathematically closest to the query. However, this often produces redundant, repetitive results. **Maximal Marginal Relevance (MMR)** balances similarity to the query against diversity among selected documents.

```python
# File: rag/retriever/mmr.py
from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from langchain_mistralai import MistralAIEmbeddings

load_dotenv()

# Sample corpus containing duplicate/overlapping facts
docs = [
    Document(page_content="Sun rises in the east"),
    Document(page_content="Sun sets in the west"),
    Document(page_content="Moon is the satellite of Earth"),
    Document(page_content="Earth is the third planet from the Sun"),
    Document(page_content="Earth is the only planet in the Solar System that can support life"),
    Document(page_content="Earth is the only planet in the Solar System that has liquid water on its surface")
]

embedding_model = MistralAIEmbeddings(model="mistral-embed")
vector_store = Chroma.from_documents(docs, embedding_model)

# 1. Standard Similarity Retriever
similarity_retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 2}
)

print("\n--- Standard Similarity Results ---")
for doc in similarity_retriever.invoke("what is the role of sun"):
    print(doc.page_content)

# 2. Maximal Marginal Relevance (MMR) Retriever
mmr_retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 2}
)

print("\n--- MMR Results (Balances Relevance & Diversity) ---")
for doc in mmr_retriever.invoke("what is the role of sun"):
    print(doc.page_content)
```

#### Lab 9.3.2: Multi-Query Retrieval with LLM Query Expansion (`multiquery.py`)

Distance-based search fails when a user query is phrased sub-optimally. The **`MultiQueryRetriever`** uses an LLM to generate multiple re-phrased variations of the user's input query, executes retrieval across all variations, and unions the results.

```python
# File: rag/retriever/multiquery.py
from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from langchain_mistralai import MistralAIEmbeddings, ChatMistralAI
from langchain_classic.retrievers.multi_query import MultiQueryRetriever

load_dotenv()

docs = [
    Document(page_content="Sun rises in the east"),
    Document(page_content="Sun sets in the west"),
    Document(page_content="Moon is the satellite of Earth"),
    Document(page_content="Earth is the third planet from the Sun")
]

embedding_model = MistralAIEmbeddings(model="mistral-embed")
vector_store = Chroma.from_documents(docs, embedding_model)

retriever = vector_store.as_retriever()
llm = ChatMistralAI(model="mistral-small-latest")

# Instantiate MultiQuery Retriever
multi_query_retriever = MultiQueryRetriever.from_llm(
    llm=llm,
    retriever=retriever
)

# User Query will be automatically expanded into 3 distinct variations by the LLM
results = multi_query_retriever.invoke("where does sun rise")

print("\n--- MultiQuery Results ---")
for doc in results:
    print(doc.page_content)
```

#### Lab 9.3.3: External Academic Document Retrieval (`ret_arxiv.py`)

LangChain provides pre-built retrievers to fetch data directly from third-party APIs (e.g., arXiv paper repository).

```python
# File: rag/retriever/ret_arxiv.py
from langchain_community.retrievers import ArxivRetriever

# Fetch top 2 papers matching search query
retriever = ArxivRetriever(load_all_available_meta=True, load_max_docs=2)
result = retriever.invoke("modern information retrieval")

for i, doc in enumerate(result):
    print(f"\nResult {i+1}")
    print("Metadata:", doc.metadata)
    print("Content Sample:", doc.page_content[:100])
```

---

# PART IV: ADVANCED ORCHESTRATION & AGENTS

## Chapter 10: LangChain Expression Language (LCEL) & Advanced Runnables

### 10.1 Composition with Runnables

**LangChain Expression Language (LCEL)** provides a declarative syntax for composing individual primitives into unified execution chains using the unix-style pipe operator (`|`).

```text
Prompt Template  ──►  Language Model  ──►  Output Parser
```

### 10.2 Runnable Primitives & Execution Mechanics

#### Lab 10.2.1: Sequential Chains with `|` Operator (`sqqunce.py`)

Comparing manual multi-step execution vs. LCEL sequential composition.

```python
# File: rag/runnable/sqqunce.py
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

prompt = ChatPromptTemplate.from_template("Explain {topic} in simple words")
model = ChatMistralAI(model='mistral-small-2603')
parser = StrOutputParser()

# --- LCEL Sequential Composition ---
chain = prompt | model | parser

res = chain.invoke({'topic': 'RAG'})
print(res)
```

#### Lab 10.2.2: Parallel Execution with `RunnableParallel` & `RunnableLambda` (`parallel.py`)

Executes multiple independent prompt pipelines simultaneously in parallel.

```python
# File: rag/runnable/parallel.py
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel, RunnableLambda

load_dotenv()

model = ChatMistralAI(model='mistral-small-2603')
parser = StrOutputParser()

prompt1 = ChatPromptTemplate.from_template("Explain {topic} in simple words")
prompt2 = ChatPromptTemplate.from_template("Summarize this text in bullet points - {text}")

# Define Parallel Branch Execution
chain = RunnableParallel({
    "short": RunnableLambda(lambda x: x['short']) | prompt1 | model | parser,
    "summarize": RunnableLambda(lambda x: x['summarize']) | prompt2 | model | parser
})

res = chain.invoke({
    'short': {'topic': 'RAG'},
    'summarize': {'text': 'LangChain is an enterprise framework.'}
})

print("Short Output:", res['short'])
print("\nSummarize Output:\n", res['summarize'])
```

#### Lab 10.2.3: Data Passthrough with `RunnablePassthrough` (`passthroughr.py`)

Passes raw outputs forward into downstream prompts while simultaneously returning them in the final dictionary.

```python
# File: rag/runnable/passthroughr.py
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel, RunnablePassthrough

load_dotenv()

model = ChatMistralAI(model='mistral-small-2603')
parser = StrOutputParser()

prompt1 = ChatPromptTemplate.from_messages([
    ('system', "You are a code generator."),
    ('human', "Generate a {language} code for this prompt - {prompt}")
])

prompt2 = ChatPromptTemplate.from_messages([
    ('system', "You are a code reviewer."),
    ('human', "Explain this {code} code in simple words.")
])

# Chain 1: Generates Code
chain1 = prompt1 | model | parser

# Chain 2: Uses Passthrough to keep generated code & pass it into explanation prompt
chain2 = RunnableParallel({
    'code': RunnablePassthrough(),
    'explaination': prompt2 | model | parser
})

# Compose Complete Sequential + Parallel Pipeline
res = chain1 | chain2

result = res.invoke({'language': 'python', 'prompt': 'create a function for binary search'})

print("--- GENERATED CODE ---")
print(result['code'])

print("\n--- CODE EXPLANATION ---")
print(result['explaination'])
```

---

## Chapter 11: Tools and Autonomous Agents

### 11.1 Equipping Models with Tools

A **Tool** is an external function or API that an LLM can invoke dynamically to calculate values, search the web, or read a database. Common tools include calculators, web search APIs, database connectors, and code interpreters.

```text
User Query: "What is 12,543 multiplied by 876?"
                     │
                     ↓
             Language Model
                     │
                     ↓ (Decides to invoke tool)
              Calculator Tool
                     │
                     ↓ (Executes 12,543 * 876)
             Result: 10,987,668
                     │
                     ↓
             Language Model
                     │
                     ↓
       User Answer: "12,543 * 876 = 10,987,668"
```

### 11.2 Autonomous Agents

An **Agent** leverages an LLM as a dynamic reasoning engine to determine which tools to invoke, in what sequence, and with what parameters to fulfill a multi-step user goal.

```text
User Input: "Find the weather in Delhi and calculate the temperature in Fahrenheit."
                                   │
                                   ↓
                             Agent Reasoning
                              /           \
                             ↓             ↓
                     Weather API        Calculator
                             \             /
                              ↓           ↓
                            Final Synthesis
```

### 11.3 Chains vs. Agents

| Feature | Chain Paradigm | Agent Paradigm |
| :--- | :--- | :--- |
| **Execution Flow** | Hardcoded, fixed sequential execution path. | Dynamic, model-determined execution path. |
| **Tool Selection** | Pre-determined by developer at compile time. | Selected dynamically at runtime based on context. |
| **Decision Engine** | Application code logic. | LLM reasoning loop. |

---

## Chapter 12: Complete End-to-End Application Architectures

### 12.1 Architectural Flow Diagrams

#### Basic Prompt-to-Response Pipeline
```text
USER ──► User Prompt ──► ChatPromptTemplate ──► LLM Model ──► Output Parser ──► Final Response
```

#### Full Retrieval-Augmented Generation (RAG) Architecture
```text
[ Document Ingestion Pipeline ]
Raw Files ──► Loaders ──► Text Splitters ──► Embeddings ──► Vector Database Index

[ Runtime RAG Pipeline ]
User Question ──► Retriever ──► Relevant Context ──► Prompt Template ──► LLM ──► Answer
```

### 12.2 Practical Code Implementation Guide

```python
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_mistralai import ChatMistralAI

load_dotenv()

model = ChatMistralAI(model="YOUR_MODEL")

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert teacher who explains complex concepts simply."),
    ("human", "Explain {topic} with a clear practical example.")
])

chain = prompt | model
response = chain.invoke({"topic": "Generative AI"})
print(response.content)
```

### 12.3 Full Web UI Implementation: Streamlit & LangChain Chat Assistant (`ui.py`)

A stateful web application built with Streamlit and LangChain (`ui.py`).

```python
import streamlit as st
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_mistralai import ChatMistralAI

load_dotenv()

model = ChatMistralAI(model="mistral-medium-3-5")

st.set_page_config(page_title="Mistral Joke Assistant", page_icon="😂", layout="centered")
st.title("😂 Mistral Joke Assistant")

if "messages" not in st.session_state:
    st.session_state.messages = [
        SystemMessage(content="You are a joke assistant and always give funny replies.")
    ]

for msg in st.session_state.messages:
    if isinstance(msg, HumanMessage):
        with st.chat_message("user"):
            st.write(msg.content)
    elif isinstance(msg, AIMessage):
        with st.chat_message("assistant"):
            st.write(msg.content)

prompt = st.chat_input("Ask me anything...")

if prompt:
    with st.chat_message("user"):
        st.write(prompt)

    st.session_state.messages.append(HumanMessage(content=prompt))

    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            response = model.invoke(st.session_state.messages)
            st.write(response.content)

    st.session_state.messages.append(AIMessage(content=response.content))

with st.sidebar:
    st.header("Options")
    if st.button("🗑 Clear Chat"):
        st.session_state.messages = [
            SystemMessage(content="You are a joke assistant and always give funny replies.")
        ]
        st.rerun()
```

---

### 12.4 Full Production CLI RAG System (`main.py`)

This full interactive command-line application (`main.py`) connects Chroma vector storage with MMR retrieval, prompt formatting, context fallback rules, and an interactive chat loop.

```python
# File: rag/main.py
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI, MistralAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

# Initialize Chat Model & Embeddings
chat_model = ChatMistralAI(model="mistral-small-2506")
embedding_model = MistralAIEmbeddings(model="mistral-embed")

# Load Persisted Chroma Vector Store
vector_store = Chroma(
    persist_directory='m',
    embedding_function=embedding_model
)

# Configure MMR Retriever Search
retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={
        "k": 2,
        "fetch_k": 5,
        "lambda_mult": 0.5
    }
)

# Define Strict Context Prompt Template
prompt = ChatPromptTemplate.from_messages([
    ("system", """
        You are an AI assistant. Answer the user's query based on the context provided below.
        If the answer is not present in context, simply respond: 'Didn't find in document.'
    """),
    ("human", "Query: {question}\nContext: {context}\n")
])

print("\n\n----------------- RAG AI Assistant (Press 0 to exit) -----------------\n\n")

while True:
    query = input("You : ")
    if query == "0":
        print("Exiting RAG AI Assistant. Goodbye!")
        break
        
    # Step 1: Retrieve Relevant Document Chunks
    retrieved_docs = retriever.invoke(query)
    context = "\n\n".join([doc.page_content for doc in retrieved_docs])
    
    # Step 2: Format Prompt with Question & Context
    final_prompt = prompt.invoke({"question": query, "context": context})

    # Step 3: Invoke Chat Model
    res = chat_model.invoke(final_prompt)

    # Step 4: Display Output
    print("\nBot : ", res.content, "\n")
```

---

# APPENDICES

## Appendix A: Essential Terminology Quick Reference

| Term | Full Form / Concept | Functional Definition |
| :--- | :--- | :--- |
| **AI** | Artificial Intelligence | Machine systems engineered to simulate human intelligence. |
| **ML** | Machine Learning | Algorithms that learn patterns from empirical data. |
| **GenAI** | Generative AI | AI models that synthesize new content (text, images, code). |
| **LLM** | Large Language Model | Deep learning models trained on vast text data for language tasks. |
| **Token** | Subword Unit | Atomic text unit processed by an LLM tokenizer. |
| **Prompt** | Input Instruction | Text input or instructions provided to direct model output. |
| **Context** | Input Background | Information provided alongside prompts to guide generation. |
| **Context Window** | Token Limit | Maximum token capacity an LLM can process in one turn. |
| **Embedding** | Dense Vector | High-dimensional numeric array representing semantic meaning. |
| **Vector** | Numeric Coordinate | Array of numbers used to perform similarity search in spatial distance. |
| **Vector Store** | Vector Database | Storage database optimized for high-speed vector similarity queries. |
| **Retriever** | Context Fetcher | Module interface that queries vector stores for relevant documents. |
| **RAG** | Retrieval-Augmented Generation | Technique injecting external search results into LLM prompts. |
| **Tool** | External Capability | Function (API, database, calculator) callable by an LLM. |
| **Agent** | Autonomous System | LLM-driven reasoning loop that dynamically selects actions and tools. |
| **Chain** | Runnable Sequence | Fixed sequence of composable operations (Prompt \| Model \| Parser). |
| **Temperature** | Sampling Parameter | Hyperparameter controlling randomness and variance in generation. |

---

## Appendix B: The Big Picture & Recommended Learning Roadmap

### Complete System Hierarchy

```text
                        GENERATIVE AI
                              │
             ┌────────────────┴────────────────┐
             ↓                                 ↓
        Text Generation                 Image Generation
             │
             ↓
    Large Language Model (LLM)
             │
      ┌──────┼─────────┐
      ↓      ↓         ↓
     GPT   Gemini   Claude
      │
      ↓
   LLM API Calls
      │
      ↓
 Native Python Applications
      │
      ↓
 LangChain Framework
      │
 ┌────┼──────────────────────────┐
 ↓    ↓         ↓       ↓        ↓
Models Prompts  RAG   Runnables Tools/Agents
          │
          ↓
   Document Processing
          │
    ┌─────┼──────┐
    ↓     ↓      ↓
 Loaders Splitters Embeddings
                 │
                 ↓
            Vector Stores
                 │
                 ↓
              Retrievers
                 │
                 ↓
                LLM
```

### Sequential Learning Roadmap

```text
 1. Generative AI Fundamentals
 └──► 2. Large Language Models (LLMs)
      └──► 3. Tokens & Context Window Mechanics
           └──► 4. Model Provider Ecosystems
                └──► 5. Direct LLM API Integration
                     └──► 6. Prompt Engineering Principles
                          └──► 7. Python LLM Application Building
                               └──► 8. Introduction to LangChain
                                    └──► 9. Core Primitives (Models, Prompts, Messages, Parsers)
                                         └──► 10. Document Processing (Loaders & Splitters)
                                              └──► 11. Embeddings & Vector Databases
                                                   └──► 12. Context Retrievers
                                                        └──► 13. RAG Architecture Implementation
                                                             └──► 14. LCEL & Runnables Orchestration
                                                                  └──► 15. Equipping Tools & External APIs
                                                                       └──► 16. Autonomous Agent Workflows
```
