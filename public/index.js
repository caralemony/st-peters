var results = document.getElementById('results');
var btn = document.getElementById('submit');

btn.addEventListener('click', function() {
    var url = '/newsCall?';
    console.log(url);
    fetch(url)
      .then(
        function(response) {
          if (response.status === 201) {
            results.innerText = this.responseText;
          } else if (response.status === 200){
            console.log('something');
          }
        }
      ).catch(function(err) {
        console.log(err);
      });
  });
});
