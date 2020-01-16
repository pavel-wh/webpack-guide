import './styles/styles.css'

import Post from './Post'

import json from './assets/data/example.json'

import WebpackLogo from './assets/images/webpack-logo.png'

const post = new Post('Webpack Post Title', WebpackLogo)

console.log('Post to Stirng: ', post.toString(), json)