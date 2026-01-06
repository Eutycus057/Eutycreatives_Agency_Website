import os
from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_job_description(jd_text):
    prompt = f"""
    Analyze the following job description and extract:
    1. Required Skills (list)
    2. Preferred Skills (list)
    3. Key Responsibilities (list)
    4. Important Action Verbs (list)
    5. ATS Keywords (list)

    Job Description:
    {jd_text}

    Return the result as a structured JSON object.
    """
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": "You are an expert ATS (Applicant Tracking System) analyst."},
                  {"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    return json.loads(response.choices[0].message.content)

def analyze_resume_compatibility(resume_text, job_analysis):
    prompt = f"""
    Evaluate the compatibility of the provided Resume against the Job Analysis.
    
    **Resume Text:**
    {resume_text}
    
    **Job Analysis:**
    {json.dumps(job_analysis, indent=2)}
    
    Return a JSON object with:
    1. "ats_score": {{ "total": 0-100, "matched_keywords": [], "missing_important_keywords": [] }}
    2. "suggestions": [ "list of 3 key improvements" ]
    3. "extracted_info": {{ "name": "...", "email": "...", "phone": "...", "location": "...", "professional_title": "..." }}
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": "You are an ATS Scoring specialist."},
                  {"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    return json.loads(response.choices[0].message.content)

def optimize_resume(resume_text, job_analysis, target_role=None, experience_level=None):
    prompt = f"""
    You are a professional CV writer specializing in ATS optimization and keyword injection. 
    Your task is to REVAMP the provided Resume text to achieve a high ATS score based on the Job Analysis.

    **CRITICAL GOAL:**
    - The final resume MUST fit on a single A4 page. 
    - INJECT all "ATS Keywords" and "Important Action Verbs" naturally into the content.
    - ADD quantifiable metrics (e.g., percentages, amounts, timeframes) where logical to increase impact.
    - Use the provided "Job Analysis" to prioritize the most relevant work experiences.

    **Rules:**
    - Preserve all factual information (dates, companies, degrees).
    - NEVER fabricate skills or experience, but rephrase to highlight relevance using the requested keywords.
    - Structure: Professional Summary, Core Skills, Work Experience (Job Title – Company), Education, Certifications.

    **Resume Text:**
    {resume_text}

    **Job Analysis:**
    {json.dumps(job_analysis, indent=2)}

    Return the revamped resume as a structured JSON object with the following keys:
    "personal_info": {{ "name": "...", "professional_title": "...", "email": "...", "phone": "...", "location": "...", "links": [] }},
    "professional_summary": "...",
    "work_experience": [ {{ "job_title": "...", "company": "...", "location": "...", "dates": "...", "bullets": [] }} ],
    "skills": [ "..." ],
    "education": [ {{ "degree": "...", "institution": "...", "location": "...", "dates": "..." }} ],
    "certifications": [ "..." ]
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": "You are an expert CV writer."},
                  {"role": "user", "content": prompt}],
        response_format={ "type": "json_object" }
    )
    return json.loads(response.choices[0].message.content)
