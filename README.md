# Message board data store API

An API to store threads and comments. It allows people to register as users of the API and store their posts in the API.

The API allows users to post, edit, or delete their posts.

## API URL
API Built for message board: [https://fakebook-of-pandas.herokuapp.com/](https://fakebook-of-pandas.herokuapp.com/)

## Demo
You can find the appication using this api in the link below:
-   [Github Repository](https://github.com/clonehuy10/Project2-frontEnd/)
-   [Fakebook](https://clonehuy10.github.io/Project2-frontEnd/)

## API End Points
#### Authenciation
| Verb   | URI Pattern            |
|--------|------------------------|
| POST   | `/sign-up`             |
| POST   | `/sign-in`             |
| DELETE | `/sign-out`            |
| PATCH  | `/change-password`     |

#### Event Management
| Verb   | URI Pattern            |
|--------|------------------------|
| GET    | `/threads`             |
| POST   | `/threads`             |
| GET    | `/threads/:id`         |
| PATCH  | `/threads/:id`         |
| DELETE | `/threads/:id`         |
| POST   | `/comments`            |
| PATCH  | `/comments/:id`        |
| DELETE | `/comments/:id`        |

All data returned from API actions is formatted as JSON.

## ERD
![ERD](https://i.imgur.com/CPe1Irp.png)

## Development process
Before starting to write any code, I went to the big names like Facebook, Instargram, Reddit, ...etc to get the idea how a message board should work. I came up with an idea that I would let users to sign up and sign in first, then they could view all of the threads on the site; after that, they could dive into which thread they felt intersting in and left a comment for it. When I had a clear idea how I should build the site, I knew I could start on coding my site.\
\
The first part I worked on was creating a new threads. I started with a form on html where users could put in the title and the cotent they would want for their threads. Because I had experience working with form when doing the authentication, I got it done very quick. While doing the creating, I removed the requireToken for Index request on the back-end, so that I could view all the datas I had on my site. After done creating the threads, I also got creating comments done because they were very similar to each other.
\
The second part I worked on was editting. I also started with a form on html because I got comfortable using the form to interact with users. And I didn't think about using the same form I had for creating because I didn't know about how to use 2 buttons on 1 form and they could trigger different functions, but I knew how to do it later while helping my classmates after my project was done. And this part was similar to changing the password in the authentication, so that I got through this quite easy. I also got the deleting threads and comments because they were very close, deleting worked exactly like editing without passing in data.\
\
Next, I worked on the index feature. At first everything was smooth, I could get all the threads and their comments showing on my site. Things started to get complicated when I tried to create edit and delete buttons with specific id for each thread and each comment, so that I could edit or delete with just one click, before I had to grab the id of the thread or the comment I want to delete. I couldn't get my event listener to work when targeting the edit and delete buttons. I didn't know why but I knew where I could find the answer. I remembered one of my classmates had something similar to this one on his first project, I reached out to him right the way and I got the answer. It was event delegation, because the buttons was created with javascript, they didnt exist when loading the site, and the event listener couldn't target them. The solution was making an empty div on html to wrapping around the new contents were created by javascript. My problem was solved very quickly.\
\
After that, I spent 2 days to learn about bootstrap especially modal, and use it to polish my site.

## Unsolved Problems
-   I want to learn how to store video, sound, and image to mongodb. Right now this api can only store text and number.
-   I want to have more subdocuments, there is only 1 document and 1 subdocument in this current version.

## Disclaimer

This API may be reset or altered at anytime. The future of this API may not
align with the current state and therefore the state your client application
expects. If you would like to maintain a version of this API in its current
state for your future use, please fork and clone the repository and launch it
on heroku.
