const clone = require('clone')

let db = {}

const defaultData = {
  "1": {
    id: '1',
    timestamp: 1508283158397,
    title: 'You\'re a Stark of Winterfell.',
    body: 'You know our words.',
    author: 'Eddard Stark',
    category: 'House Stark',
    voteScore: 1,
    deleted: false
  },
  "2": {
    id: '2',
    timestamp: 1508303158397,
    title: 'There is great honor in serving in the Nights Watch.',
    body: 'The Starks have manned the Wall for thousands of years, and you are a Stark. You may not have my name, but you have my blood.',
    author: 'Eddard Stark',
    category: 'House Stark',
    voteScore: 4,
    deleted: false
  },
  "3": {
    id: '3',
    timestamp: 1508293158397,
    title: 'I am the King!',
    body: 'I will punish you.',
    author: 'Joffrey Baratheon',
    category: 'House Lannister',
    voteScore: -2,
    deleted: false
  },
  "4": {
    id: '4',
    timestamp: 1508423158397,
    title: 'You stand in the presence of Daenerys Stormborn of House Targaryen.',
    body: 'Rightful heir to the Iron Throne, rightful Queen of the Andals and the First Men, Protector of the Seven Kingdoms, the Mother of Dragons, the Khaleesi of the Great Grass Sea, the Unburnt, the Breaker of Chains.',
    author: 'Missandei',
    category: 'House Targaryen',
    voteScore: 7,
    deleted: false
  },
  "5": {
    id: '5',
    timestamp: 1508538664307,
    title: 'Daenerys is the Dragon Queen.',
    body: 'Can\'t very well let the dragons starve. That\'s obvious.',
    author: 'Tyrion Lannister',
    category: 'House Targaryen',
    voteScore: 5,
    deleted: false
  },
  "6": {
    id: '6',
    timestamp: 1508847813082,
    title: 'We know no king but the King in the North whose name is Stark.',
    body: 'Your son was butchered at the Red Wedding, Lord Manderly, but you refused the call. You swore allegiance to House Stark, Lord Glover, but in their hour of greatest need, you refused the call. And you, Lord Cerwyn, your father was skinned alive by Ramsay Bolton. Still you refused the call. But House Mormont remembers. The North remembers. We know no king but the King in the North whose name is Stark. I don\'t care if he\'s a bastard. Ned Stark\'s blood runs through his veins. He\'s my king from this day until his last day.',
    author: 'Lyanna Mormont',
    category: 'House Stark',
    voteScore: 6,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}
