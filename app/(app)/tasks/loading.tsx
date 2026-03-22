export default function Loading() {
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <div style={{padding:'18px 24px 0',background:'#fff',borderBottom:'1px solid #e2e8f0'}}>
        <div style={{height:28,width:120,borderRadius:8,background:'#e2e8f0',marginBottom:16,animation:'pulse 1.5s ease-in-out infinite'}}/>
        <div style={{display:'flex',gap:4,paddingBottom:1}}>{[80,60,70].map((w,i)=><div key={i} style={{height:34,width:w,borderRadius:6,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>)}</div>
      </div>
      <div style={{flex:1,background:'#fff',padding:'0'}}>
        {[...Array(8)].map((_,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'0 16px',height:38,borderBottom:'1px solid #f8fafc'}}>
            <div style={{width:13,height:13,borderRadius:3,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
            <div style={{width:15,height:15,borderRadius:'50%',border:'1.5px solid #e2e8f0'}}/>
            <div style={{flex:1,height:13,borderRadius:6,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
            <div style={{width:100,height:20,borderRadius:10,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
            <div style={{width:60,height:13,borderRadius:6,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
          </div>
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  )
}
