from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
import os
import json
from parser import parse_resume
from ai_engine import analyze_job_description, analyze_resume_compatibility, optimize_resume
from generator import generate_docx, generate_pdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_endpoint(
    resume_file: UploadFile = File(...),
    job_description_text: str = Form(None),
    job_description_file: UploadFile = File(None)
):
    try:
        resume_bytes = await resume_file.read()
        resume_text = parse_resume(resume_bytes, resume_file.filename)
        
        jd_text = job_description_text or ""
        if job_description_file:
            jd_bytes = await job_description_file.read()
            jd_text += "\n" + parse_resume(jd_bytes, job_description_file.filename)
        
        if not jd_text:
            raise HTTPException(status_code=400, detail="Job description is required.")

        job_analysis = analyze_job_description(jd_text)
        compatibility = analyze_resume_compatibility(resume_text, job_analysis)
        
        return {
            "analysis": compatibility,
            "original_resume_text": resume_text,
            "job_analysis": job_analysis
        }

    except Exception as e:
        print(f"Error in /analyze: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/revamp")
async def revamp_endpoint(
    resume_text: str = Form(...),
    job_analysis_json: str = Form(...),
    target_role: str = Form(None),
    experience_level: str = Form(None)
):
    try:
        job_analysis = json.loads(job_analysis_json)
        optimized_data = optimize_resume(resume_text, job_analysis, target_role, experience_level)
        return optimized_data
    except Exception as e:
        print(f"Error in /revamp: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/export")
async def export_resume_endpoint(
    data: dict = Body(...),
    format: str = "docx"
):
    try:
        if format == "pdf":
            stream = generate_pdf(data)
            media_type = "application/pdf"
            filename = "Optimized_Resume.pdf"
        else:
            stream = generate_docx(data)
            media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            filename = "Optimized_Resume.docx"
        
        return StreamingResponse(
            stream,
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

    except Exception as e:
        print(f"Error in /export: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
