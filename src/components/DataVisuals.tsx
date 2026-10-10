import { useState } from 'react'
import { Activity, ArrowRight, Braces, ChevronDown, Database, GitBranch, Layers, Terminal } from 'lucide-react'

const trendSets = {
  '30 days': [17, 22, 20, 28, 24, 36, 32, 43, 38, 50, 46, 58, 51, 67, 62, 72, 66, 79, 74, 87],
  '14 days': [23, 31, 27, 38, 33, 46, 41, 58, 53, 68, 59, 73, 69, 85],
}

export function TrendChart({ period = '30 days' }: { period?: keyof typeof trendSets }) {
  const [selected, setSelected] = useState<number | null>(null)
  const values = trendSets[period]
  const positions = values.map((value, index) => [43 + index * 370 / (values.length - 1), 148 - value * 1.12])
  const line = positions.map(position => position.join(',')).join(' ')
  return <div className="trend-chart">
    <svg viewBox="0 0 445 190" role="img" tabIndex={0} aria-label={`Illustrative analytical trend over ${period}. Synthetic values, not project results. Use left and right arrow keys to explore sample values.`} onKeyDown={event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelected(previous => Math.max(0, Math.min(values.length - 1, (previous ?? 0) + (event.key === 'ArrowRight' ? 1 : -1))))
      }
    }}>
      <defs><linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22D3EE" stopOpacity=".22"/><stop offset="100%" stopColor="#22D3EE" stopOpacity="0"/></linearGradient></defs>
      {[25, 65, 105, 145].map((position, index) => <g key={position}><line x1="43" x2="417" y1={position} y2={position} stroke="#A7B4C8" strokeOpacity=".1" strokeDasharray="3 5"/><text x="9" y={position + 4}>{90 - index * 25}</text></g>)}
      <polygon points={`43,148 ${line} 413,148`} fill="url(#trend-fill)"/>
      <polyline points={positions.map(([horizontal, vertical]) => `${horizontal},${vertical + 20}`).join(' ')} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeOpacity=".65" strokeDasharray="4 5"/>
      <polyline points={line} fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinejoin="round"/>
      {positions.map(([horizontal, vertical], index) => <g key={index}><circle cx={horizontal} cy={vertical} r="8" fill="transparent" onMouseEnter={() => setSelected(index)} onMouseLeave={() => setSelected(null)}/>{(index === positions.length - 1 || selected === index) && <circle cx={horizontal} cy={vertical} r="4" fill="#0B1220" stroke="#22D3EE" strokeWidth="2"/>}</g>)}
      {(period === '30 days' ? ['Day 01', 'Day 07', 'Day 14', 'Day 21', 'Day 30'] : ['Day 01', 'Day 07', 'Day 14']).map((label, index, labels) => <text key={label} x={43 + index * 360 / (labels.length - 1)} y="174" textAnchor={index === 0 ? 'start' : 'middle'}>{label}</text>)}
    </svg>
    <span className="chart-tooltip" aria-live="polite">{selected !== null && values[selected] !== undefined ? `Sample ${selected + 1} · Index ${values[selected]}` : 'Hover or use ← → to explore'}</span>
  </div>
}

export function ScatterChart({ income = false }: { income?: boolean }) {
  return <svg className="scatter-chart" viewBox="0 0 225 145" role="img" aria-label={income ? 'Illustrative age and income scatter plot. Synthetic data, not Census findings.' : 'Illustrative scatter plot showing two synthetic data clusters.'}>
    {[35, 65, 95].map(position => <line key={position} x1="30" x2="215" y1={position} y2={position} stroke="#A7B4C8" strokeOpacity=".1" strokeDasharray="2 4"/>)}
    <line x1="30" x2="30" y1="15" y2="118" stroke="#718096" strokeOpacity=".35"/><line x1="30" x2="215" y1="118" y2="118" stroke="#718096" strokeOpacity=".35"/>
    {Array.from({ length: 48 }, (_, index) => <circle key={index} cx={36 + (index * 31 % 172)} cy={22 + (index * 17 % 78)} r={2 + index % 2 * .5} fill={index % 3 === 0 ? '#8B5CF6' : '#22D3EE'} opacity={.45 + index % 4 * .14}><title>Illustrative sample {index + 1}</title></circle>)}
    <text x="118" y="140" textAnchor="middle">{income ? 'Age (years)' : 'Feature 01'}</text><text transform="translate(13,72) rotate(-90)" textAnchor="middle">{income ? 'Income index' : 'Feature 02'}</text>
  </svg>
}

export function AnalyticsWorkspace() {
  const [period, setPeriod] = useState<keyof typeof trendSets>('30 days')
  return <div className="workspace-composition">
    <div className="workspace-glow"/>
    <div className="workspace">
      <div className="workspace-top"><span className="window-dots"><i/><i/><i/></span><span><Terminal size={12}/> tamim / data-workspace</span><span className="live-dot"/></div>
      <div className="workspace-heading"><div><span className="tiny-label">THE ANALYTICAL WORKSPACE</span><h3>Discover. Analyze. Predict.</h3></div><div className="workspace-icon"><svg viewBox="0 0 28 28" width="25" height="25" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <rect key={index} x={3 + index % 4 * 6} y={3 + Math.floor(index / 4) * 6} width="3" height="3" rx=".8" fill={index % 5 === 0 ? '#8B5CF6' : '#22D3EE'} opacity={.25 + index % 4 * .2}/>)}</svg></div></div>
      <div className="trend-panel"><div className="panel-heading"><span><span className="cyan-dot"/> Analytical trend</span><label className="period-selector"><span className="sr-only">Illustrative trend time period</span><select value={period} onChange={event => setPeriod(event.target.value as keyof typeof trendSets)}><option>30 days</option><option>14 days</option></select><ChevronDown size={11}/></label></div><TrendChart period={period}/><div className="chart-legend"><span><i/> Observed trend</span><span><i/> Baseline</span><span>ILLUSTRATIVE DATA</span></div></div>
      <div className="workspace-bottom"><div className="scatter-panel"><div className="panel-heading"><span>Pattern discovery</span><GitBranch size={13}/></div><ScatterChart/><div className="cluster-legend"><span><i/> Cluster A</span><span><i/> Cluster B</span></div></div><div className="code-panel"><div className="panel-heading"><span><Braces size={13}/> explore.py</span><span className="python-label">Python</span></div><pre><code><span className="code-purple">import</span> pandas <span className="code-purple">as</span> pd{'\n'}<span className="code-purple">from</span> sklearn <span className="code-purple">import</span>{'\n'}    model_selection{'\n\n'}data = pd.<span className="code-cyan">read_csv</span>({'\n'}    <span className="code-green">"dataset.csv"</span>{'\n'}){'\n'}data.<span className="code-cyan">describe</span>()</code></pre><div className="code-status"><span className="live-dot"/> Curiosity meets code.</div></div></div>
      <div className="pipeline"><span className="tiny-label">ML PIPELINE</span><div><span><Database size={14}/> Data</span><ArrowRight size={12}/><span><Layers size={14}/> Prepare</span><ArrowRight size={12}/><span><GitBranch size={14}/> Model</span><ArrowRight size={12}/><span><Activity size={14}/> Evaluate</span></div></div>
    </div>
    <div className="floating-chip"><span className="chip-icon"><Braces size={19}/></span><div>Built on curiosity.<span>Powered by Python.</span></div><span className="live-dot"/></div>
    <div className="workspace-caption"><span className="caption-line"/> A little glimpse into how I think. <span>All visual data is illustrative.</span></div>
  </div>
}

export function ChurnVisual() {
  return <div className="project-art churn-art"><div className="art-heading"><span><GitBranch size={14}/> CUSTOMER CHURN · CLASSIFICATION</span><span className="sample-label">ILLUSTRATIVE WORKFLOW</span></div><div className="churn-layout"><div className="customer-clusters"><div className="cluster-grid">{Array.from({ length: 48 }, (_, index) => <span key={index} className={index % 5 === 0 || index > 36 ? 'cluster-violet' : ''}/>)}</div><div className="cluster-legend"><span><i/> Retained</span><span><i/> Churned</span></div></div><div className="evaluation-panel"><div><Activity size={13}/> Model evaluation</div>{['Precision', 'Recall', 'F1-score'].map(label => <p key={label}><span>{label}</span><span>—</span></p>)}<small>Illustrative placeholders · no scores claimed</small></div></div><div className="project-pipeline">{['Dataset', 'Data Preparation', 'Feature Engineering', 'Classification', 'Model Evaluation'].map((label, index) => <span key={label}>{index > 0 && <ArrowRight size={11}/>}<span>{label}</span></span>)}</div></div>
}

export function IncomeVisual() {
  const bars = [12, 22, 40, 64, 86, 97, 79, 55, 34, 21, 13, 7]
  return <div className="project-art income-art"><div className="art-heading"><span><Activity size={14}/> INCOME EXPLORATION</span><span className="sample-label">ILLUSTRATIVE DATA</span></div><div className="income-charts"><div><div className="mini-chart-title">Income distribution</div><svg viewBox="0 0 240 148" role="img" aria-label="Illustrative income distribution histogram, not actual Census findings.">{[30, 65, 100].map(position => <line key={position} x1="30" x2="233" y1={position} y2={position} stroke="#A7B4C8" strokeOpacity=".1" strokeDasharray="3 4"/>)}{bars.map((height, index) => <rect key={index} x={32 + index * 16.5} y={116 - height} width="12" height={height} rx="2" fill={index > 5 ? '#3B82F6' : '#22D3EE'} opacity={.55 + index % 3 * .15}/>)}<text x="127" y="140" textAnchor="middle">Income bands (sample)</text><text transform="translate(13,72) rotate(-90)" textAnchor="middle">Frequency</text></svg><div className="cluster-legend"><span><i/> Sample distribution</span></div></div><div><div className="mini-chart-title">Exploring relationships</div><ScatterChart income/><div className="cluster-legend"><span><i/> Group A</span><span><i/> Group B</span></div></div></div><div className="art-note">Visual exploration, not verified Census results.</div></div>
}
