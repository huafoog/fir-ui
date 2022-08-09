const fs = require('fs')
const path = require('path')
const http = require('http')
const config = require('./config')

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
/**
 * path
 */
function getPath(pathUrl) {
  return path.resolve(__dirname, pathUrl)
}
function generateTemplate(arr) {
  return `import { ${arr.join(', ')} } from '@/utils/request'\n`
}

function titleCase(str) {
  const newStr = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return newStr
}

function generateFunc(name, summary, type = 'post') {
  const arr = name.slice(1).split('/')
  let num = 1
  let fun = arr[arr.length - 1]
  if (fun.endsWith('}')) {
    num++
    fun = arr[arr.length - num] + 'By' + titleCase(type)
  }

  return `
/**
 * ${summary || ''}
 */
export function ${fun}(data, cb, errHandle) {
  return ${type}('${name}', data, cb, errHandle)
}\n`
}
function httpgetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const { statusCode } = res
      const contentType = res.headers['content-type']

      let error
      if (statusCode !== 200) {
        error = new Error('请求失败。\n' +
                      `状态码: ${statusCode}`)
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' +
                      `期望 application/json 但获取的是 ${contentType}`)
      }
      if (error) {
        console.error(error.message)
        // 消耗响应数据以释放内存
        res.resume()
        return
      }

      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
        } catch (e) {
          reject(`错误: ${e.message}`)
        }
      })
    }).on('error', (e) => {
      reject(`错误: ${e.message}`)
    })
  })
}

const srcFolder = '/src'

async function main() {
  console.log(config.config)
  console.log('获取远程json文件中...')
  for (let index = 0; index < config.config.length; index++) {
    const element = config.config[index]
    gen(element.path, element.module)
  }
}

async function gen(url, module) {
  const { paths, basePath } = await httpgetJson(url)
  console.log('获取成功正在生成api文件')
  const obj = {}
  for (const name in paths) {
    const path = paths[name]

    let folder = ''
    if (path.post) {
      const tag = path.post.tags[0]
      if (!tag) continue
      const urlArray = name.slice(1).split('/')
      if (name.slice(1).split('/').length === 4) {
        folder = urlArray[1]
      } else {
        if (name.slice(1).split('/')[0] !== tag) continue
      }
      if (obj[path.post.tags[0]]) {
        obj[path.post.tags[0]].push({ summary: path.post.summary, tag, name, type: 'post', folder })
      } else {
        obj[path.post.tags[0]] = [{ summary: path.post.summary, tag, name, type: 'post', folder }]
      }
    } else if (path.get) {
      const tag = path.get.tags[0]
      if (!tag) continue
      const urlArray = name.slice(1).split('/')
      if (name.slice(1).split('/').length === 4) {
        folder = urlArray[1]
      } else {
        if (name.slice(1).split('/')[0] !== tag) continue
      }
      if (obj[path.get.tags[0]]) {
        obj[path.get.tags[0]].push({ summary: path.get.summary, tag, name, type: 'get', folder })
      } else {
        obj[path.get.tags[0]] = [{ summary: path.get.summary, tag, name, type: 'get', folder }]
      }
    }
  }
  for (const tagName in obj) {
    let jsString = ''
    const requestTypes = []
    let folder = ''
    for (const item of obj[tagName]) {
      const requestType = requestTypes.filter(o => o === item.type)
      if (requestType.length === 0) requestTypes.push(item.type)
      jsString += generateFunc(basePath + item.name, item.summary, item.type)
      folder = item.folder
    }
    jsString = generateTemplate(requestTypes) + jsString
    const filePath = `..${srcFolder}/api/${module}/${folder}`
    mkdirsSync(getPath(filePath))
    fs.writeFileSync(getPath(`${filePath}/${tagName}.js`), jsString)
  }
  console.log('生成完毕')
}

main()
