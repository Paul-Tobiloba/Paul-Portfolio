// The pending URL prevents a cancelled older route from clearing a newer indicator.
export function subscribeRouteLoading(events,onChange) {
  let activeURL=null;
  const start=(url,{shallow}={})=>{if(shallow)return;activeURL=url;onChange(true);};
  const finish=(url)=>{if(activeURL!==url)return;activeURL=null;onChange(false);};
  const fail=(_error,url)=>finish(url);
  events.on('routeChangeStart',start);
  events.on('routeChangeComplete',finish);
  events.on('routeChangeError',fail);
  return ()=>{
    events.off('routeChangeStart',start);events.off('routeChangeComplete',finish);events.off('routeChangeError',fail);
    activeURL=null;
  };
}
