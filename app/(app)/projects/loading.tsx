export default function Loading() {
  return (
    <div style={{padding:24,background:'#f8fafc',flex:1}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}>
        <div>
          <div style={{height:28,width:120,borderRadius:8,background:'#e2e8f0',marginBottom:8,animation:'pulse 1.5s ease-in-out infinite'}}/>
          <div style={{height:14,width:100,borderRadius:6,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
        </div>
        <div style={{height:38,width:130,borderRadius:8,background:'#e2e8f0',animation:'pulse 1.5s ease-in-out infinite'}}/>
      </div>
      <div style={{height:14,width:80,borderRadius:6,background:'#f1f5f9',marginBottom:14,animation:'pulse 1.5s ease-in-out infinite'}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
        {[...Array(6)].map((_,i)=>(
          <div key={i} style={{background:'#fff',borderRadius:10,border:'1px solid #e2e8f0',padding:20}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <div style={{width:34,height:34,borderRadius:9,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
              <div style={{flex:1}}>
                <div style={{height:14,borderRadius:6,background:'#e2e8f0',marginBottom:6,animation:'pulse 1.5s ease-in-out infinite'}}/>
                <div style={{height:11,width:'60%',borderRadius:5,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
              </div>
            </div>
            <div style={{height:5,borderRadius:99,background:'#f1f5f9',marginBottom:8,animation:'pulse 1.5s ease-in-out infinite'}}/>
            <div style={{height:11,width:'50%',borderRadius:5,background:'#f1f5f9',animation:'pulse 1.5s ease-in-out infinite'}}/>
          </div>
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </div>
  )
}
