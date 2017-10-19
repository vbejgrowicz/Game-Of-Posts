const clone = require('clone')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun49g": {
    id: '894tuq4ut84ut8v4t8wun49g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1508303158397,
    body: 'Winter is Comming.',
    author: 'Arya Stark',
    voteScore: 8,
    deleted: false,
    parentDeleted: false
  },
  "qwe4tuq4ut84ut52538wun89g": {
    id: 'qwe4tuq4ut84ut52538wun89g',
    parentId: "m0m6ok3ym7mf1p33lnez",
    timestamp: 1508313158397,
    body: 'A bastard boy with nothing to inherit, off to join the ancient order of the Night\'s Watch. Alongside his valiant brothers in arms.',
    author: 'Tyrion Lannister',
    voteScore: 10,
    deleted: false,
    parentDeleted: false
  },
  "op04tuq4uew34t8v4t8wun89g": {
    id: 'op04tuq4uew34t8v4t8wun89g',
    parentId: "m0m6ok3ym7mf1p33lnez",
    timestamp: 1508323158397,
    body: 'The Night\'s Watch protects the realm from...',
    author: 'Jon Snow',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  "yp04tuq4ut84ut8f4t8wun89g": {
    id: 'yp04tuq4ut84ut8f4t8wun89g',
    parentId: "m0m6ok3ym7mf1p33lnez",
    timestamp: 1508323158397,
    body: 'Ah, ah, yes, yes, against grumpkins and snarks and all the other monsters your wet nurse warned you about. You\'re a smart boy, you don\'t believe that nonsense.',
    author: 'Tyrion Lannister',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "ap04tuq4ut84ut8v4t8wun89g": {
    id: 'ap04tuq4ut84ut8v4t8wun89g',
    parentId: "m0m6ok3ym7mf1p33lnez",
    timestamp: 1508373158397,
    body: 'Give my regards to the Night\'s Watch. I\'m sure it will be thrilling. And if it\'s not, it\'s only for life.',
    author: 'Jamie Lannister',
    voteScore: 4,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1508303158397,
    body: 'Any man who must say, "I am the king" is no true king. I\'ll make sure you understand that when I\'ve won the war for you.',
    author: 'Tywin Lannister',
    voteScore: 5,
    deleted: false,
    parentDeleted: false
  },
  "apf4bsun805n8un48ve89": {
    id: 'apf4bsun805n8un48ve89',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1508313158397,
    body: 'My father won the real war. He killed Prince Rhaegar. He took the crown while you hid under Casterly Rock!',
    author: 'Joffrey Baratheon',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "ymp4bsun805n8un48ve89": {
    id: 'ymp4bsun805n8un48ve89',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1508314158397,
    body: 'You\'re too old to protect anybody.',
    author: 'Joffrey Baratheon',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  "y00bsun805n8un48ve89": {
    id: 'y00bsun805n8un48ve89',
    parentId: "axi6ok3ym7mf1p33lnez",
    timestamp: 1508423758397,
    body: 'This is Jon Snow...He\'s King in the North.',
    author: 'Davos Seaworth',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "aisbsun805n8un48ve89": {
    id: 'aisbsun805n8un48ve89',
    parentId: "axi6ok3ym7mf1p33lnez",
    timestamp: 1508424158397,
    body: 'Right now, you and I and Cersei and everyone else, we\'re playing at a game, screaming that the rules aren\'t fair.',
    author: 'Jon Snow',
    voteScore: 10,
    deleted: false,
    parentDeleted: false
  },
  "apqursun505n8un48ve89": {
    id: 'apqursun505n8un48ve89',
    parentId: "axi6ok3ym7mf1p33lnez",
    timestamp: 1508424558397,
    body: 'The Army of the Dead is real. The white walkers are real. The Night King is real. I\'ve seen them. If they get past the Wall and we\'re squabbling amongst ourselves... we\'re finished.',
    author: 'Jon Snow',
    voteScore: -1,
    deleted: false,
    parentDeleted: false
  },
  "lmnursun405n8un48ve89": {
    id: 'lmnursun405n8un48ve89',
    parentId: "axi6ok3ym7mf1p33lnez",
    timestamp: 1508424858397,
    body: 'Do you know what kept me standing through all those years in exile? Faith. Not in any gods, not in myths and legends. In myself. In Daenerys Targaryen. The world hadn\'t seen a dragon in centruries until my children were born. The Dothraki hadn\'t crossed the sea, any sea. They did for me. I was born to rule the Seven Kingdoms, and I will.',
    author: 'Daenerys Targaryen',
    voteScore: 9,
    deleted: false,
    parentDeleted: false
  },
  "qtyursun105n8un48ve89": {
    id: 'qtyursun105n8un48ve89',
    parentId: "axi6ok3ym7mf1p33lnez",
    timestamp: 1508424958397,
    body: 'You\'ll be ruling over a graveyard if we don\'t defeat the Night King.',
    author: 'Jon Snow',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
