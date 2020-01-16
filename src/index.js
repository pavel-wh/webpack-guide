import './styles/styles.css'

import Post from './Post'

import json from './assets/data/example.json'
import xml from './assets/data/example.xml'
import csv from './assets/data/example.csv'

import WebpackLogo from './assets/images/webpack-logo.png'

const post = new Post('Webpack Post Title', WebpackLogo)

console.log('Post to Stirng: ', post.toString(), json, xml, csv)