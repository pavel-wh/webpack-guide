import Vue from 'vue'

import '@/styles/css/styles.css'
import '@/styles/sass/main.sass'
import '@/styles/less/main.less'

import Post from '@models/Post' 

import './index.jsx'
import VueComponent from './index.vue'
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

import ('lodash').then(_ => {
    console.log('Lodash', _.random(0, 42, true))
})

document.addEventListener('DOMContentLoaded', () => {
    const el = pageBox.parentElement.appendChild(document.createElement('vue-app'))
    new Vue({
        el,
        render: h => h(VueComponent)
    })
})