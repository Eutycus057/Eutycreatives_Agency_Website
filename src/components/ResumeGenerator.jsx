import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeGenerator = ({ isOpen, onClose }) => {
    // Stage management: 'idle' | 'analyzing' | 'analyzed' | 'revamping' | 'revamped'
    const [stage, setStage] = useState('idle');

    // Form Inputs
    const [file, setFile] = useState(null);
    const [jdText, setJdText] = useState('');
    const [jdFile, setJdFile] = useState(null);
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');

    // Results
    const [analysisResult, setAnalysisResult] = useState(null);
    const [revampedData, setRevampedData] = useState(null);
    const [originalText, setOriginalText] = useState('');
    const [jobAnalysis, setJobAnalysis] = useState(null);

    // Progress & UI
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (loading) {
            const interval = setInterval(() => {
                setProgress((prev) => (prev < 90 ? prev + Math.random() * 5 : prev));
            }, 800);
            return () => clearInterval(interval);
        } else {
            setProgress(0);
        }
    }, [loading]);

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleJdFileChange = (e) => setJdFile(e.target.files[0]);

    const handleStartOver = () => {
        setStage('idle');
        setFile(null);
        setJdText('');
        setJdFile(null);
        setRole('');
        setExperience('');
        setAnalysisResult(null);
        setRevampedData(null);
        setOriginalText('');
        setJobAnalysis(null);
        setError(null);
    };

    const runAnalysis = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setStage('analyzing');

        const formData = new FormData();
        formData.append('resume_file', file);
        formData.append('job_description_text', jdText);
        if (jdFile) formData.append('job_description_file', jdFile);

        try {
            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Analysis failed');

            const data = await response.json();
            setAnalysisResult(data.analysis);
            setOriginalText(data.original_resume_text);
            setJobAnalysis(data.job_analysis);
            setStage('analyzed');
            setProgress(100);
            setTimeout(() => setLoading(false), 500);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            setStage('idle');
        }
    };

    const runRevamp = async () => {
        setLoading(true);
        setError(null);
        setStage('revamping');

        const formData = new FormData();
        formData.append('resume_text', originalText);
        formData.append('job_analysis_json', JSON.stringify(jobAnalysis));
        if (role) formData.append('target_role', role);
        if (experience) formData.append('experience_level', experience);

        try {
            const response = await fetch('http://localhost:8000/revamp', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Revamp failed');

            const data = await response.json();
            setRevampedData(data);
            setStage('revamped');
            setProgress(100);
            setTimeout(() => setLoading(false), 500);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            setStage('analyzed');
        }
    };

    const handleExport = async (format) => {
        if (!revampedData) return;
        setExporting(format);
        try {
            const response = await fetch(`http://localhost:8000/export?format=${format}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(revampedData),
            });

            if (!response.ok) throw new Error('Export failed');

            const name = revampedData.personal_info.name.replace(/\s+/g, '_');
            const title = revampedData.personal_info.professional_title.replace(/\s+/g, '_');
            const sanitizedName = `${name}_${title}`.replace(/[^a-zA-Z0-9_]/g, '');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${sanitizedName}.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            setError(`Export failed: ${err.message}`);
        } finally {
            setExporting(null);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={overlayStyle}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                style={modalContainerStyle}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Left Column: Analysis & Controls */}
                <div style={leftColStyle}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>AI ATS Revamp</h2>
                    <p style={{ color: '#555', fontSize: '0.8rem', marginBottom: '1.5rem' }}>Stage: {stage.toUpperCase()}</p>

                    {/* INPUT FORM (Only in Idle/Analyzing) */}
                    {(stage === 'idle' || stage === 'analyzing') && (
                        <form onSubmit={runAnalysis} style={{ display: 'grid', gap: '1.2rem' }}>
                            <div className="form-group">
                                <label style={labelStyle}>Current Resume</label>
                                <input type="file" accept=".pdf,.docx" onChange={handleFileChange} required style={inputStyle} />
                            </div>
                            <div className="form-group">
                                <label style={labelStyle}>Target Job Description</label>
                                <textarea value={jdText} onChange={(e) => setJdText(e.target.value)} placeholder="Paste JD highlights here..." rows={8} style={inputStyle} required />
                            </div>
                            <button type="submit" disabled={loading} className="btn" style={primaryBtnStyle}>
                                {loading ? `Analyzing... ${Math.round(progress)}%` : 'Target Analysis'}
                            </button>
                        </form>
                    )}

                    {/* ANALYSIS RESULTS (After Stage 1) */}
                    {(stage === 'analyzed' || stage === 'revamping' || stage === 'revamped') && analysisResult && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={scoreBoxStyle(analysisResult.ats_score.total)}>
                                <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase' }}>Initial Match Score</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{analysisResult.ats_score.total}%</div>
                            </div>

                            <div>
                                <h4 style={subHeaderStyle}>Missing Requirements</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                    {analysisResult.ats_score.missing_important_keywords.map(k => <span key={k} style={tagStyle(false)}>{k}</span>)}
                                </div>
                            </div>

                            <div>
                                <h4 style={subHeaderStyle}>Revamp Settings</h4>
                                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Target Role..." style={{ ...inputStyle, marginBottom: '0.5rem' }} />
                                <select value={experience} onChange={(e) => setExperience(e.target.value)} style={inputStyle}>
                                    <option value="">Experience Level</option>
                                    <option value="Entry">Entry</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Senior">Senior</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
                                <button onClick={runRevamp} disabled={loading || stage === 'revamped'} style={{ ...primaryBtnStyle, flex: 2 }}>
                                    {stage === 'revamping' ? `Revamping... ${Math.round(progress)}%` : 'Revamp Resume'}
                                </button>
                                <button onClick={handleStartOver} style={secondaryBtnStyle}>Start Over</button>
                            </div>
                        </div>
                    )}

                    {error && <div style={errorStyle}>{error}</div>}

                    <div style={footerNoteStyle}>
                        * Revamp injects missing keywords and optimizes your metrics.
                    </div>
                </div>

                {/* Right Column: Preview Area */}
                <div style={rightColStyle}>
                    <div style={toolbarStyle}>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>
                            {stage === 'revamped' ? '✨ REVAMPED PREVIEW' : '📄 ORIGINAL CONTENT EXTRACTED'}
                        </div>
                        {stage === 'revamped' && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => handleExport('pdf')} disabled={exporting} style={exportBtnStyle('#ff4d4d')}>
                                    {exporting === 'pdf' ? '...' : 'PDF'}
                                </button>
                                <button onClick={() => handleExport('docx')} disabled={exporting} style={exportBtnStyle('#2b579a')}>
                                    {exporting === 'docx' ? '...' : 'DOCX'}
                                </button>
                            </div>
                        )}
                    </div>

                    <div style={previewScrollAreaStyle} className="cv-scroller">
                        {(!analysisResult && !revampedData) ? (
                            <div style={emptyPreviewStyle}>
                                <div style={{ fontSize: '8rem' }}>🎯</div>
                                <p>Analysis will extract your current compatibility profile.</p>
                            </div>
                        ) : (
                            <div style={cvCanvasStyle}>
                                {renderCV(revampedData || analysisResult.extracted_info)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Close Button */}
                <button onClick={onClose} style={closeBtnStyle}>&times;</button>
            </motion.div>
        </motion.div>
    );
};

// CV Renderer Helper
const renderCV = (data) => {
    const isOriginal = !data.work_experience;
    if (isOriginal) {
        return (
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '20px' }}>{data.name?.toUpperCase()}</h1>
                <p style={{ textAlign: 'center', fontSize: '10px', color: '#666' }}>{data.email} | {data.phone} | {data.location}</p>
                <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed #ccc', borderRadius: '4px', textAlign: 'center', color: '#888' }}>
                    Click "Revamp Resume" to generate the optimized, keyword-enriched CV structure.
                </div>
            </div>
        );
    }
    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{data.personal_info.name.toUpperCase()}</h1>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#333' }}>{data.personal_info.professional_title}</div>
                <div style={{ fontSize: '9px', color: '#666', marginTop: '4px' }}>
                    {data.personal_info.email} | {data.personal_info.phone} | {data.personal_info.location}
                </div>
            </div>
            <div style={cvSectionStyle}>
                <h2 style={cvSectionHeadStyle}>Professional Summary</h2>
                <p style={{ margin: 0, lineHeight: '1.4' }}>{data.professional_summary}</p>
            </div>
            <div style={cvSectionStyle}>
                <h2 style={cvSectionHeadStyle}>Core Skills</h2>
                <p style={{ margin: 0 }}>{data.skills.join(', ')}</p>
            </div>
            <div style={cvSectionStyle}>
                <h2 style={cvSectionHeadStyle}>Work Experience</h2>
                {data.work_experience.map((job, i) => (
                    <div key={i} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '10px' }}>
                            <span>{job.job_title} – {job.company}</span>
                            <span>{job.dates}</span>
                        </div>
                        <ul style={{ margin: '3px 0 0 15px', padding: 0 }}>
                            {job.bullets.map((bullet, j) => <li key={j} style={{ marginBottom: '1px' }}>{bullet}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
            <div style={cvSectionStyle}>
                <h2 style={cvSectionHeadStyle}>Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                        <span style={{ fontWeight: 700 }}>{edu.degree} | {edu.institution}</span>
                        <span>{edu.dates}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

// UI Styles
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', overflow: 'hidden' };
const modalContainerStyle = { background: '#080808', width: '96vw', height: '94vh', borderRadius: '32px', display: 'flex', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' };
const leftColStyle = { flex: '0 0 420px', padding: '2rem', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', overflowY: 'auto' };
const rightColStyle = { flex: 1, padding: '2rem', background: '#020202', display: 'flex', flexDirection: 'column' };
const labelStyle = { display: 'block', marginBottom: '0.4rem', fontSize: '0.7rem', color: '#646cff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' };
const inputStyle = { width: '100%', padding: '0.7rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '0.85rem' };
const primaryBtnStyle = { background: '#646cff', color: 'white', border: 'none', padding: '0.9rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' };
const secondaryBtnStyle = { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#888', padding: '0.9rem', borderRadius: '10px', flex: 1, cursor: 'pointer' };
const scoreBoxStyle = (score) => ({ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '15px', border: `1px solid ${score > 70 ? 'rgba(0,255,179,0.1)' : 'rgba(255,204,0,0.1)'}`, textAlign: 'center', color: score > 70 ? '#00ffb3' : '#ffcc00' });
const subHeaderStyle = { fontSize: '0.75rem', fontWeight: 800, color: '#646cff', marginBottom: '0.6rem', textTransform: 'uppercase' };
const tagStyle = (match) => ({ fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.1)', color: '#ff4d4d' });
const errorStyle = { marginTop: '1rem', padding: '0.8rem', background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', borderRadius: '8px', fontSize: '0.8rem' };
const footerNoteStyle = { marginTop: 'auto', paddingTop: '1.5rem', fontSize: '0.65rem', color: '#444', fontStyle: 'italic' };
const toolbarStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' };
const exportBtnStyle = (bg) => ({ background: bg, color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' });
const previewScrollAreaStyle = { flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center' };
const emptyPreviewStyle = { alignSelf: 'center', textAlign: 'center', opacity: 0.1, color: 'white' };
const cvCanvasStyle = { background: 'white', color: 'black', width: '100%', maxWidth: '650px', padding: '35px', borderRadius: '2px', fontSize: '10px', fontFamily: '"Inter", sans-serif', height: 'fit-content', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' };
const cvSectionStyle = { marginBottom: '15px' };
const cvSectionHeadStyle = { borderBottom: '1px solid #eee', fontSize: '11px', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 800 };
const closeBtnStyle = { position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'rgba(255,255,255,0.05)', color: 'white', width: '30px', height: '30px', borderRadius: '50%', border: 'none', fontSize: '1rem', cursor: 'pointer', zIndex: 100 };

export default ResumeGenerator;
