# Media Roundup v1.0
Check out my app here https://media-roundup.herokuapp.com/

## Analysing the news with Artificial Intelligence

APIs used - IBM's Watson and News

### Why?

Recently, it came to my attention that one could play around with IBM's Watson, an Artificial Intelligence platform, which is think is pretty neat :sunglasses: 

### How?

I decided to utilise its Natural Language Understanding functionailty. This API takes either a URL or plain text and then returns the following features:

* Emotions (joy, disgust, anger, fear, sadness) as a numerical value
* Sentiments (Positive or Negative)
* Entities (People or Places)
* Concepts
* Keywords

In my app I have decided to use the emotions feature (for now!).

For the content, I have used the News API which takes a search term (user input) and a source (1 of 4 options). This returns the most recent articles relating to this topic from which I choose the first.

**N.B** This returns the most recent articles containing the search term, so may not be 100% relevant. However this is supposed to be lightheated only and not a true, balanced representation of the topic!

### User Journey
As a user I can;

* Enter a topic of my choosing
* Choose a news source (Daily Mail, Guardian, Reddit and Buzzfeed - more to be added)
* Get back an emotion (joy, fear etc)
* Decide whether you agree with that or not!

### Planned Additional Features

* Twitter. Analyse tweets on a given topic, due when Twitter decide to give me an API key
* More news sources from News API
* Add a Postgres database to add URLs and topics
     - Can then plot trends over time by search term and/or source
     - Users can up/down vote as to whether they agree with the Watson analysis of the article
