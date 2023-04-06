# CP3407 Group 1 Project 1
## IDEA Generator - Alpha Release

<p align="center">
  <img src="./image/idea.png">
</p>

### Writer's block happen to all of us, to minimized that, let IDEA Generator, an AI story and picture engine powered by OpenAI, be the source for your next inspiration!

## Flowchart
```mermaid
---
title: IDEA Generator
---
flowchart LR
  A[User Input]
  B(AI Generated Story)
  C(AI Generated Images)
  D[AI story with images]
  E{Satisfied?}
  F[END]
  G[Regenerate]
  A == ChatGPT 3.5 turbo ==> B
  A == Dall-E ==> C
  B --> D
  C --> D
  D --> E
  E --YES----> F
  E --NO--> G
  G --> D
```
## Tech Stack
* React (vite)
* ExpressJS
* AWS Lightsail 

| ![Diagram](./image/architecture_diagram.png) | 
|:--:| 
| *architecture* |

## How to use
### Online deployment
> *Due to budget limit on OpenAI API, the online application may be taken down. If that is the case, download and host application with your own OpenAI API key. More detail: [local deployment](#local-deployment).*

Checkout our application at **[sihanchen.com](https://sihanchen.com)** and we would greatly appreciate any feedback you have.

### Local deployment

To use the application on your local computer, first clone repo :
```
git clone https://github.com/sihanchen01/cp3407.git
```
Change directory into app folder:
```
cd cp3407
```
Firstly, run `npm install` to install [concurrently](https://www.npmjs.com/package/concurrently) (at homefolder [package.json](./package.json)), which allow us to update or run both frontend and backend with a single command:
```
npm install
```
Then, run`num run getAll` to install and update both frontend and backend dependencies:
```
npm run getAll
```
Create a file `.env` at `cp3407/backend/.env`, specify `8001` as backend port and input your OpenAI api key ([OpenAI API Key](https://platform.openai.com/account/api-keys)). 

The final `.env` file should look like this:
```
PORT=8001
OPENAI_API_KEY="YOUR_API_KEY"
```

> Also, you need to change front end api call URL from "https://ase.sihanchen.com:8001/" to "http://localhost:8001/" 

> One more thing, the `backend/server.js` was set with https server, wich requires a `.crt` and `.key` file for SSL/TLS certification. If you wich to run localhost, use `server_http.js` instead.

Lastly, to **run** both frontend and backend applications:
```
npm run start
```
## Changelog:
* Version 1.4
    * Add AWS DynamoDB to stack, as the database of choice.
      * Create table name *search_result*, with Partition key *UserId*, and sort key *CreationDate*
    * Data sructure:
      | UserId (String) | CreationDate (number) | Story (String) | StoryLike (number) | ImageUrl (String) | ImageLike (number)|
      |---|---|---|---|---|---|
      | u1@a.io  | 1680748332  | ipsum  | 0 | http:example.com/image  | 1    |
      | u2@a.io  | 1680748309  | ipsum  | 0 | http:example.com/image  | null |
      * UserId: user email retrived from auth0, store as a string
      * CreationDate: timestamp of search request received by backend server, store as a number
      * Story/ImageUrl: search result retrived from OpenAI, store as a string
      * StoryLike/ImageLike: boolean value, null for no feedback; store as a boolean


* Version 1.3
    * Add [auth0](https://auth0.com/) to frontend as 3rd party authentication middleware, allow user to signup via Google
    * Now user must sign up and be verified (verification only apply to email sign up, 3rd party authentication automatically verified) before they can use search function.
    * OpenAI API free trial has ended at April 1st 2023, the current testing is conducted with self-paid API key, so it's likely for us to __disable backend server__ on production website, to lower development overhead.
    * Add [react-bootstrap](https://react-bootstrap.github.io/) to ease the frontend styling & revamp previous pages with bootstrap.
    * __DEBUG__:
      * backend server works during test, however, sending CORS error in production. possible cause: changed domain causing https cert failure
    * __TODO__:
      * fix CORS error

    | ![new home page](./image/new_home_page.png) |
    |:--:| 
    | *new home page* |

    | ![invalid user search](./image/invalid_user_search.png) |
    |:--:| 
    | *invalid user search* |

    | ![valid user search](./image/valid_user_search.png) |
    |:--:| 
    | *valid user search* |

* Version 1.2
    * Complete Online deployment with [AWS Lightsail](https://aws.amazon.com/lightsail/) instance
    * Added SSL Certificate
    * Hosted website at: [sihanchen.com](https://sihanchen.com)
    * __TODO__:
      * Create roadmap to add more functions and optimize current features
      * Add user registration, limit using to verified users to avoid spam 
      * Pick a Database and design schemas
      * Consider the possibility of using AWS S3 to store user generated content

* Version 1.1
    * Add home page, navigation and routers (using [react-router](https://reactrouter.com/en/main))
    * Add search bar to let user to search interested topic, then dynamically generate AI image and text 

    | ![search bar](./image/search_bar.png) |
    |:--:| 
    | *search bar* |

    | ![dynamic content](./image/user_generated_content.png) |
    |:--:| 
    | *dynamic content* |

    * __TODO__: 
        * Add function to gather user feedback on satisfaction of AI generated content, for further tuning
        * Online deployment.
    #

* Version 1.0
    * React ([vite](https://vitejs.dev/)) frontend + [Express](https://expressjs.com/) backend
    * A **single page application**, aims to simply demonstrate results of AI image generator ([Dall-E](https://platform.openai.com/docs/api-reference/images/create)) combining with AI text generator ([Chatgpt 3.5 turbo](https://platform.openai.com/docs/api-reference/chat/create))
    * Replace [DeepAI](https://deepai.org/machine-learning-model/text2img) with Dall-E, as DeepAI requires membership and is more expensive.

      | ![loading](./image/loading.png) |
      |:--:| 
      | *loading content* |

      | ![content](./image/story_with_image.png) |
      |:--:| 
      | *An example of AI generated content with topic: 'Batman vs Ironman'* |

    * __TODO__: 
      * Add search bar
      * Navigation
      * More CSS


