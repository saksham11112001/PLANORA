export default function Loading() {
  return (
    <div style={{flex:1,padding:24,background:'#f8fafc'}}>
      <div style={{height:28,width:200,borderRadius:8,background:'#e2e8f0',marginBottom:8,animation:'pulse 1.5s ease-in-out infinite'}}/>
      <div style={{height:14,width:150,borderRadius:6,background:'#f1f5f9',marginBottom:28,animation:'pulse 1.5s ease-in-out infinite'}}/>
      <div style={{background:'#fff',borderRadius:10,border:'1px solid #e2e8f0',overflow:'hidden'}}>
        {[...Array(6)].map((_,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderBottom:'1px solid #f8fafc'}}>
            <div style={{width:32,height:32,borderRadius:8,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite',flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{height:13,borderRadius:6,background:'#e2e8f0',marginBottom:5,animation:'pulse 1.5s ease-in-out infinite'}}/>
              <div style={{height:11,width:'50%',borderRadius:5,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
            </div>
            <div style={{width:70,height:20,borderRadius:10,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
          </div>
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  )
}
