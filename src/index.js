import * as $ from 'jquery'

import '@/styles/css/styles.css'
import '@/styles/sass/main.sass'
import '@/styles/less/main.less'

import Post from '@models/Post'

import './babel'

import json from '@/assets/data/example.json'
import xml from '@/assets/data/example.xml'
import csv from '@/assets/data/example.csv'

import WebpackLogo from '@/assets/images/webpack-logo'

const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').addClass('code').html(post.toString())

console.log('Post to Stirng: ', post.toString(), json, xml, csv)