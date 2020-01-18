import '@/styles/css/styles.css'
import '@/styles/sass/main.sass'
import '@/styles/less/main.less'

import Post from '@models/Post' 

import './index.jsx'
import './babel'

import json from '@/assets/data/example.json'
import xml from '@/assets/data/example.xml'
import csv from '@/assets/data/example.csv'

import WebpackLogo from '@/assets/images/webpack-logo'

const post = new Post('Webpack Post Title', WebpackLogo)
const pageBox = document.querySelector('pre')
pageBox.classList.add('code')
console.log(pageBox.innerText = post.toString())

console.log('Post to Stirng: ', post.toString(), json, xml, csv)

import ('lodash/random').then(_ => {
    console.log('Lodash', _.random(0, 42, true))
})