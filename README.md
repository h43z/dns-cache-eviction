In order to do a fast and successful [DNS rebinding attack](https://github.com/h43z/dns-rebinding-tool)
the browser has to execute a new DNS query for the same domain in the shortest
possible time.


The website provided in this repo makes it easy to investigate how long a browser
has DNS entry cached. It makes use of my  [DNS rebinding attack tool](https://github.com/h43z/dns-rebinding-tool)
which provides a domain that toggles between 2 IP addresses.
