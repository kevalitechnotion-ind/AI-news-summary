import os
import re
import json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Load environment variables
load_dotenv()   
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini LLM
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=GEMINI_API_KEY)

# Summarization prompt
summarize_prompt = PromptTemplate.from_template("""
You are a professional AI news summarizer.

Your task is to read the news article provided and generate a summary in the following strict JSON format:

{{
  "title": "<Rewrite the original title into a more attractive, attention-grabbing headline>",
  "summary": "<Write a clear, concise summary in 3–4 sentences. Emphasize 3–5 key terms (such as names, technologies, companies, or events) using **double asterisks**. Do not include irrelevant details or opinions.>"
}}

Only return the JSON output — no extra text, explanations, or commentary.   

News:  
Title: {title}  
Content: {content}
""")

summarize_chain = LLMChain(llm=llm, prompt=summarize_prompt)

# News selection prompt
select_best_prompt = PromptTemplate.from_template("""
You are an expert AI news evaluator and communicator.

Below are 10 summarized AI news articles.

Your task:
1. **Select the most important, relevant, and impactful article** as `"best_news"`. It should be the most recent and have significant real-world consequences or major industry developments.
2. **Select the most viral and attention-grabbing article** as `"most_viral_news"`. It should be the one most likely to spark curiosity, discussions, or go viral on social media.
3. **Select a third article** as `"relevant_news"`. This should be related in theme, topic, or industry to either `"best_news"` or `"most_viral_news"`, but must be different from them in content and angle.
4. **Refine the summaries** into clear, concise, and engaging language that is both:
   - **AI-enhanced** (well-structured, professional wording)
   - **Human-friendly** (easy for a general audience to understand)
5. Ensure summaries are **1–3 sentences** with strong keywords that make the news sound interesting without distorting facts.

Return ONLY in the following JSON format (no extra text, no explanations):
{{
  "best_news": {{
    "title": "<title of the most important news>",
    "summary": "<AI-refined human-friendly summary of the most important news>"
  }},
  "most_viral_news": {{
    "title": "<title of the most viral news>",
    "summary": "<AI-refined human-friendly summary of the most viral news>"
  }},
  "relevant_news": {{
    "title": "<title of the related but different news>",
    "summary": "<AI-refined human-friendly summary of the related but different news>"
  }}
}}

Summarized News List:
{summaries}
""")
select_best_chain = LLMChain(llm=llm, prompt=select_best_prompt) 


# Utility to extract JSON
def extract_json(text):
    try:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
    except:
        return None
    return None

# Load raw text file
with open("raw_articles.txt", "r", encoding="utf-8") as f:
    raw_text = f.read()

# Split articles by delimiter ===

raw_articles = [a.strip() for a in raw_text.split("===") if a.strip()]

# Convert to list of title/content dictionaries
news_list = []
for article in raw_articles:
    lines = article.splitlines()
    if len(lines) < 2:
        continue
    title = lines[0].strip()
    content = "\n".join(lines[1:]).strip()
    news_list.append({"title": title, "summary": content})

# Summarize
summarized_news = []
for idx, news in enumerate(news_list[:10]):
    print(f"Summarizing article {idx+1}...")
    response = summarize_chain.run(title=news["title"], content=news["summary"])
    parsed = extract_json(response)
    if parsed:
        summarized_news.append(parsed)
    else:
        print(f"Could not summarize article {idx+1}:\n{response}")

# Select best and viral news
if summarized_news:
    summaries_json_str = json.dumps(summarized_news, indent=2)
    final_response = select_best_chain.run(summaries=summaries_json_str)
    output_data = extract_json(final_response)
else:
    output_data = {
        "best_news": {
            "title": "Error",
            "summary": "Could not extract any news."
        },
        "most_viral_news": {
            "title": "Error",
            "summary": "Could not extract any news."
        }
    }

# Save JSON output
with open("output.json", "w", encoding="utf-8") as f:
    json.dump(output_data, f, indent=2)

print("Done! Check output.json")    