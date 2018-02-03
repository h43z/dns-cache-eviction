In order to perform a fast and successful [DNS rebinding attack](https://github.com/h43z/dns-rebinding-tool)
the browser has to execute a new DNS query for the same domain at least twice
and do that in the shortest possible time.

The website provided in this repo makes it easy to investigate how long a browser
has DNS entry cached and is using it and after how long or under what
condition it does a new DNS A query.

It makes use of my [DNS rebinding attack tool](https://github.com/h43z/dns-rebinding-tool)
which provides a domain that resolves to 2 different IP addresses (first ip1 and
after 3 seconds only resolves to IP2) and end responds with abitrary javascript included.

IP2 (45.55.45.223) uses nginx default_server and reponds with just a string.

The injected code tries in a setInterval loop to execute a request against the
rebind domain which hopefully as fast as possible resolved to IP2.
The moment it does so the script stops and reports stats like
how long it took and how many requests where done back to the parent page.

The parent page allows to set two parameters. The `waitTime` to use in the
setInterval and the `iframeCount` which controls how many iframes are created
with unique domains that try to execute the attack simultaneously.

```javascript
var counter = 0
var start = Date.now()

var interval = setInterval(function(){
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '${rebind}', false)
  xhr.send()

  counter++

  if(xhr.status == 200 && xhr.responseText.indexOf('dnsrebindworked!') >= 0){
    clearInterval(interval)

    window.parent.postMessage({
      waitTime: ${waitTime},
      duration: (Date.now() - start)/1000,
      requests: counter
    }, "*")

    return
  }

}, ${waitTime})

```
