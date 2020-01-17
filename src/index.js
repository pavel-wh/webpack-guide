import * as $ from 'jquery'
import '@/styles/styles'

import Post from '@models/Post'

import json from '@/assets/data/example'
import xml from '@/assets/data/example.xml'
import csv from '@/assets/data/example.csv'

import WebpackLogo from '@/assets/images/webpack-logo'

const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').html(post.toString())

console.log('Post to Stirng: ', post.toString(), json, xml, csv)