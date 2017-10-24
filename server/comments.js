const clone = require('clone')

let db = {}

const defaultData = {
  "101": {
    id: '101',
    parentId: "1",
    timestamp: 1508303158397,
    body: 'Winter is Comming.',
    author: 'Arya Stark',
    voteScore: 8,
    deleted: false,
    parentDeleted: false
  },
  "201": {
    id: '201',
    parentId: "2",
    timestamp: 1508423758397,
    body: 'A bastard boy with nothing to inherit, off to join the ancient order of the Night\'s Watch. Alongside his valiant brothers in arms.',
    author: 'Tyrion Lannister',
    voteScore: 10,
    deleted: false,
    parentDeleted: false
  },
  "202": {
    id: '302',
    parentId: "2",
    timestamp: 1508463758397,
    body: 'The Night\'s Watch protects the realm from...',
    author: 'Jon Snow',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  "203": {
    id: '203',
    parentId: "2",
    timestamp: 1508493758397,
    body: 'Ah, ah, yes, yes, against grumpkins and snarks and all the other monsters your wet nurse warned you about. You\'re a smart boy, you don\'t believe that nonsense.',
    author: 'Tyrion Lannister',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "204": {
    id: '204',
    parentId: "2",
    timestamp: 1508593758397,
    body: 'Give my regards to the Night\'s Watch. I\'m sure it will be thrilling. And if it\'s not, it\'s only for life.',
    author: 'Jamie Lannister',
    voteScore: 4,
    deleted: false,
    parentDeleted: false
  },
  "301": {
    id: '301',
    parentId: "3",
    timestamp: 1508303158397,
    body: 'Any man who must say, "I am the king" is no true king. I\'ll make sure you understand that when I\'ve won the war for you.',
    author: 'Tywin Lannister',
    voteScore: 5,
    deleted: false,
    parentDeleted: false
  },
  "302": {
    id: '302',
    parentId: "3",
    timestamp: 1508413158397,
    body: 'My father won the real war. He killed Prince Rhaegar. He took the crown while you hid under Casterly Rock!',
    author: 'Joffrey Baratheon',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "303": {
    id: '303',
    parentId: "3",
    timestamp: 1508614158397,
    body: 'You\'re too old to protect anybody.',
    author: 'Joffrey Baratheon',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  "401": {
    id: '401',
    parentId: "4",
    timestamp: 1508423758397,
    body: 'This is Jon Snow...He\'s King in the North.',
    author: 'Davos Seaworth',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "402": {
    id: '402',
    parentId: "4",
    timestamp: 1508424158397,
    body: 'Right now, you and I and Cersei and everyone else, we\'re playing at a game, screaming that the rules aren\'t fair.',
    author: 'Jon Snow',
    voteScore: 10,
    deleted: false,
    parentDeleted: false
  },
  "403": {
    id: '403',
    parentId: "4",
    timestamp: 1508550374486,
    body: 'The Army of the Dead is real. The white walkers are real. The Night King is real. I\'ve seen them. If they get past the Wall and we\'re squabbling amongst ourselves... we\'re finished.',
    author: 'Jon Snow',
    voteScore: -1,
    deleted: false,
    parentDeleted: false
  },
  "404": {
    id: '404',
    parentId: "4",
    timestamp: 1508590374486,
    body: 'Do you know what kept me standing through all those years in exile? Faith. Not in any gods, not in myths and legends. In myself. In Daenerys Targaryen. The world hadn\'t seen a dragon in centruries until my children were born. The Dothraki hadn\'t crossed the sea, any sea. They did for me. I was born to rule the Seven Kingdoms, and I will.',
    author: 'Daenerys Targaryen',
    voteScore: 9,
    deleted: false,
    parentDeleted: false
  },
  "405": {
    id: '405',
    parentId: "4",
    timestamp: 1508650374486,
    body: 'You\'ll be ruling over a graveyard if we don\'t defeat the Night King.',
    author: 'Jon Snow',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "501": {
    id: '501',
    parentId: "5",
    timestamp: 1508538674307,
    body: 'If the dragon does not want to eat, how do you force him to eat.',
    author: 'Greyworm',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  "502": {
    id: '502',
    parentId: "5",
    timestamp: 1508538764307,
    body: 'Dragons do not do well in captivity.',
    author: 'Tyrion Lannister',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "503": {
    id: '503',
    parentId: "5",
    timestamp: 1508538864307,
    body: 'How do you know this?',
    author: 'Missandei',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "504": {
    id: '504',
    parentId: "5",
    timestamp: 1508538964307,
    body: 'That\'s what I do. I drink and I know things.',
    author: 'Tyrion Lannister',
    voteScore: 10,
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
