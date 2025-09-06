import { User, Scenario, GameRoom, Player } from '@/types';

// デモユーザー
export const demoUser: User = {
  id: 'demo-user-1',
  email: 'demo@example.com',
  username: 'demo_user',
  displayName: 'デモプレイヤー',
  createdAt: new Date(),
};

// デモシナリオ
export const demoScenarios: Scenario[] = [
  {
    id: 'scenario-1',
    title: 'マンション事件',
    description: '昨夜、マンションの一室で殺人事件が発生しました。',
    playerCount: 6,
    estimatedTime: 60,
    difficulty: 'beginner',
    content: {
      characters: [
        { 
          id: 'char-1', 
          name: '田中太郎', 
          description: '被害者の隣人。普段は穏やかな性格だが、最近被害者とトラブルがあった。', 
          role: '容疑者A', 
          isSuspect: true,
          alibi: '事件発生時は自宅でテレビを見ていたと主張している。',
          motive: '被害者との騒音トラブルで激しい口論があった。'
        },
        { 
          id: 'char-2', 
          name: '佐藤花子', 
          description: '被害者の友人。最近被害者と金銭トラブルがあった。', 
          role: '容疑者B', 
          isSuspect: true,
          alibi: '事件発生時は友人と電話で話していたと主張している。',
          motive: '被害者に多額の借金があり、返済を迫られていた。'
        },
        { 
          id: 'char-3', 
          name: '鈴木一郎', 
          description: '被害者の同僚。職場での昇進を巡って対立していた。', 
          role: '容疑者C', 
          isSuspect: true,
          alibi: '事件発生時は職場で残業していたと主張している。',
          motive: '昇進の座を巡って被害者と激しく対立していた。'
        },
        { 
          id: 'char-4', 
          name: '山田美咲', 
          description: '被害者の妻。最近夫との関係が冷え込んでいた。', 
          role: '被害者の妻', 
          isSuspect: true,
          alibi: '事件発生時は実家に帰っていたと主張している。',
          motive: '夫の浮気を疑っており、離婚を考えていた。'
        },
        { 
          id: 'char-5', 
          name: '高橋健一', 
          description: '被害者の元同僚。リストラで恨みを持っている。', 
          role: '元同僚', 
          isSuspect: true,
          alibi: '事件発生時は自宅で一人で過ごしていたと主張している。',
          motive: '被害者によってリストラされ、生活が困窮していた。'
        },
        { 
          id: 'char-6', 
          name: '小林刑事', 
          description: '事件を担当する刑事。冷静で的確な推理力を持つ。', 
          role: '刑事', 
          isSuspect: false,
          alibi: '事件発生時は警察署にいた。',
          motive: '事件の真相を解明することが使命。'
        },
      ],
      timeline: [
        { id: 'event-1', time: '20:00', description: '被害者が帰宅', location: 'マンション', involvedCharacters: ['char-1'] },
        { id: 'event-2', time: '21:30', description: '隣人との会話', location: '廊下', involvedCharacters: ['char-1', 'char-2'] },
        { id: 'event-3', time: '22:00', description: '事件発生', location: '被害者宅', involvedCharacters: ['char-1', 'char-2', 'char-3'] },
      ],
      clues: [
        { id: 'clue-1', name: '血痕', description: '床に残された血痕', location: 'リビング', type: 'physical', importance: 'high', relatedCharacters: ['char-1'] },
        { id: 'clue-2', name: '指紋', description: 'ドアノブに残された指紋', location: '玄関', type: 'physical', importance: 'medium', relatedCharacters: ['char-2'] },
        { id: 'clue-3', name: '証言', description: '隣人の証言', location: '廊下', type: 'testimony', importance: 'high', relatedCharacters: ['char-1'] },
      ],
    },
    isPublic: true,
    tags: ['現代', 'アパート', '初級'],
    creatorId: 'system',
    createdAt: new Date(),
  },
  {
    id: 'scenario-2',
    title: '豪華客船の謎',
    description: '豪華客船で発生した殺人事件の謎を解き明かせ。',
    playerCount: 8,
    estimatedTime: 90,
    difficulty: 'intermediate',
    content: {
      characters: [],
      timeline: [],
      clues: [],
    },
    isPublic: true,
    tags: ['豪華客船', '中級'],
    creatorId: 'system',
    createdAt: new Date(),
  },
  {
    id: 'scenario-3',
    title: '古城の呪い',
    description: '古城で発生した不可解な殺人事件。',
    playerCount: 10,
    estimatedTime: 120,
    difficulty: 'advanced',
    content: {
      characters: [],
      timeline: [],
      clues: [],
    },
    isPublic: true,
    tags: ['古城', '上級'],
    creatorId: 'system',
    createdAt: new Date(),
  },
];

// デモゲームルーム
export const demoGameRoom: GameRoom = {
  id: 'room-1',
  name: 'デモルーム',
  roomCode: 'ABC123',
  scenarioId: 'scenario-1',
  hostId: 'demo-user-1',
  maxPlayers: 6,
  isPrivate: false,
  status: 'waiting',
  createdAt: new Date(),
};

// デモプレイヤー
export const demoPlayers: Player[] = [
  {
    id: 'player-1',
    userId: 'demo-user-1',
    roomId: 'room-1',
    username: 'demo_user',
    displayName: 'デモプレイヤー',
    isReady: true,
    isHost: true,
    joinedAt: new Date(),
  },
  {
    id: 'player-2',
    userId: 'demo-user-2',
    roomId: 'room-1',
    username: 'player2',
    displayName: 'プレイヤー2',
    isReady: true,
    isHost: false,
    joinedAt: new Date(),
  },
  {
    id: 'player-3',
    userId: 'demo-user-3',
    roomId: 'room-1',
    username: 'player3',
    displayName: 'プレイヤー3',
    isReady: false,
    isHost: false,
    joinedAt: new Date(),
  },
  {
    id: 'player-4',
    userId: 'demo-user-4',
    roomId: 'room-1',
    username: 'player4',
    displayName: 'プレイヤー4',
    isReady: true,
    isHost: false,
    joinedAt: new Date(),
  },
];
