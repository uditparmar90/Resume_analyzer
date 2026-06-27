import { Component } from '@angular/core';

@Component({
  selector: 'app-analyze',
  imports: [],
  templateUrl: './analyze.html',
  styleUrl: './analyze.css',
})
export class Analyze {
 resumeText = '';

  handleDrop(e: DragEvent) {
    e.preventDefault();
    document.getElementById('upload-zone')?.classList.remove('dragover');
    const file = e.dataTransfer?.files[0];
    if (file) {
      // processFile(file);
    }
  }
 
 handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  if (file) this.processFile(file);
}
 
processFile(file: File) {
  const zone = document.getElementById('upload-zone');
  if (!zone) return;
  zone.classList.add('has-file');

  const uploadLabel = document.getElementById('upload-label');
  const uploadSub = document.getElementById('upload-sub');
  const analyzeBtn = document.getElementById('analyze-btn') as HTMLButtonElement | null;
  const uploadIcon = zone.querySelector('.upload-icon');

  if (uploadLabel) {
    uploadLabel.textContent = file.name;
  }
  if (uploadSub) {
    uploadSub.textContent = (file.size / 1024).toFixed(1) + ' KB · Ready to analyze';
  }
  if (uploadIcon instanceof HTMLElement) {
    uploadIcon.className = 'bi bi-file-earmark-check upload-icon d-block mb-2';
  }
  if (analyzeBtn) {
    analyzeBtn.disabled = false;
  }
  this.setStep(2);
 
  const reader = new FileReader();
  reader.onload = (ev) => {
    const result = ev.target?.result;
    this.resumeText = typeof result === 'string' ? result : '';
  };
  reader.readAsText(file);
}
 
 setStep(n: number) {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');

  if (step1) {
    step1.className = n > 1 ? 'step-pill done' : 'step-pill active';
    step1.innerHTML = n > 1
      ? '<i class="bi bi-check-circle-fill"></i> Upload'
      : '<i class="bi bi-1-circle-fill"></i> Upload';
  }
  if (step2) {
    step2.className = n === 2 ? 'step-pill active' : (n > 2 ? 'step-pill done' : 'step-pill');
  }
  if (step3) {
    step3.className = n === 3 ? 'step-pill active' : 'step-pill';
  }
}
 
getExpLevel() {
  const checked = document.querySelector('input[name="exp"]:checked');
  // return checked ? checked.value : 'junior';
}
 
// async function analyzeResume() {
//   const role = document.getElementById('job-role').value.trim() || 'Software Developer';
//   const exp  = getExpLevel();
 
//   document.getElementById('upload-section').style.display = 'none';
//   document.getElementById('loading-section').style.display = 'block';
//   setStep(3);
 
//   const prompt = `You are an expert resume reviewer. Analyze this resume for a "${role}" position at ${exp} level.
 
// Resume:
// """
// ${resumeText || '[No file text — use sample .NET developer resume data for demo]'}
// """
 
// Respond ONLY with valid JSON (no markdown, no backticks):
// {
//   "overall": 72,
//   "ats": 68,
//   "match": 65,
//   "completeness": 80,
//   "sections": [
//     {"name": "Work experience", "score": 75},
//     {"name": "Skills", "score": 60},
//     {"name": "Education", "score": 85},
//     {"name": "Summary/objective", "score": 50},
//     {"name": "Projects", "score": 45}
//   ],
//   "skillsFound": ["C#", "ASP.NET Core", "SQL", "jQuery", "AJAX"],
//   "skillsMissing": ["Docker", "Azure", "Unit Testing", "CI/CD", "Entity Framework"],
//   "strengths": [
//     "Strong backend experience with production code",
//     "Graph API and OAuth 2.0 implementation is a differentiator",
//     "Real-world MFA work shows security awareness"
//   ],
//   "improvements": [
//     "Add a GitHub URL prominently in the header",
//     "Quantify achievements with numbers and metrics",
//     "Add a personal projects section with live links",
//     "Expand the professional summary to 3–4 targeted sentences"
//   ],
//   "summary": "2-3 sentence honest, specific assessment."
// }`;
 
//   try {
//     const res = await fetch('https://api.anthropic.com/v1/messages', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         model: 'claude-sonnet-4-20250514',
//         max_tokens: 1000,
//         messages: [{ role: 'user', content: prompt }]
//       })
//     });
//     const data = await res.json();
//     const raw = data.content.map(b => b.text || '').join('');
//     const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
//     renderResults(parsed, role);
//   } catch (err) {
//     document.getElementById('loading-section').style.display = 'none';
//     document.getElementById('upload-section').style.display = 'block';
//     document.getElementById('analyze-btn').disabled = false;
//     alert('Analysis failed — please try again.');
//   }
// }
 
// function scoreClass(n) {
//   if (n >= 75) return 'score-high';
//   if (n >= 50) return 'score-mid';
//   return 'score-low';
// }
// function scoreLabel(n) {
//   if (n >= 75) return 'Strong';
//   if (n >= 50) return 'Average';
//   return 'Needs work';
// }
// function barColor(n) {
//   if (n >= 75) return '#10B981';
//   if (n >= 50) return '#F59E0B';
//   return '#EF4444';
// }
 
// function renderResults(r, role) {
//   document.getElementById('loading-section').style.display = 'none';
//   document.getElementById('result-section').style.display = 'block';
//   document.getElementById('result-subtitle').textContent =
//     `Analyzed for: ${role} · ${new Date().toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}`;
 
//   ['overall','ats','match','complete'].forEach((k, i) => {
//     const val = [r.overall, r.ats, r.match, r.completeness][i];
//     document.getElementById('score-' + k).textContent = val;
//     document.getElementById('badge-' + k).innerHTML =
//       `<span class="score-badge ${scoreClass(val)}">${scoreLabel(val)}</span>`;
//   });
 
//   document.getElementById('section-scores').innerHTML = r.sections.map(s => `
//     <div class="section-progress mb-2">
//       <div class="label-row"><span>${s.name}</span><span>${s.score}/100</span></div>
//       <div class="progress">
//         <div class="progress-bar" style="width:${s.score}%; background:${barColor(s.score)}; transition:width .8s ease;"></div>
//       </div>
//     </div>`).join('');
 
//   document.getElementById('skills-found').innerHTML =
//     r.skillsFound.map(s => `<span class="tag tag-skill">${s}</span>`).join('');
//   document.getElementById('skills-missing').innerHTML =
//     r.skillsMissing.map(s => `<span class="tag tag-missing"><i class="bi bi-plus-sm"></i>${s}</span>`).join('');
 
//   document.getElementById('strengths-list').innerHTML =
//     r.strengths.map(s => `<li>${s}</li>`).join('');
//   document.getElementById('improvements-list').innerHTML =
//     r.improvements.map(s => `<li>${s}</li>`).join('');
//   document.getElementById('summary-text').textContent = r.summary;
// }
 
//  resetTool() {
//   this.resumeText = '';
//   const fileInput = document.getElementById('file-input');
//   if (fileInput) {
//     fileInput. = '';
//   }
//   const jobRole = document.getElementById('job-role');
//   if (jobRole) {
//     jobRole.value = '';
//   }
//   const analyzeBtn = document.getElementById('analyze-btn');
//   if (analyzeBtn) {
//     analyzeBtn.disabled = true;
//   }
//   const zone = document.getElementById('upload-zone');
//   if (zone) {
//     zone.className = 'upload-zone';
//   }
//   const uploadLabel = document.getElementById('upload-label');
//   if (uploadLabel) {
//     uploadLabel.textContent = 'Drop your resume here';
//   }
//   const uploadSub = document.getElementById('upload-sub');
//   if (uploadSub) {
//     uploadSub.textContent = 'or click to browse from your device';
//   }
//   // if (zone) {
//   //   zone.querySelector('.upload-icon').className = 'bi bi-cloud-arrow-up upload-icon d-block mb-2';
//   // }
//   const resultSection = document.getElementById('result-section');
//   if (resultSection) {
//     resultSection.style.display = 'none';
//   }
//   const uploadSection = document.getElementById('upload-section');
//   if (uploadSection) {
//     uploadSection.style.display = 'block';
//   }
//   this.setStep(1);
// }
 
//  sendPrompt(text :string) {
//   if (window.sendPrompt) window.sendPrompt(text);
// }
}
