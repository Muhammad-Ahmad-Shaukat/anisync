const image1 = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgratisography.com%2Fpage%2F2%2F&psig=AOvVaw0j5LX9zuKgE1cp38i8eaCs&ust=1746272316902000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDE_7zZhI0DFQAAAAAdAAAAABAE"


export const dummyComments = [
    {
      _id: "cmt1",
      userId: {
        _id: "usr1",
        username: "SakuraChan",
        profileImage: image1
      },
      episodeId: "episode123",
      comment: "This episode blew my mind!",
      parentCommentId: null,
      likes: 12,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T09:00:00Z",
    },
    {
      _id: "cmt2",
      userId: {
        _id: "usr2",
        username: "OtakuKing",
        profileImage: image1
      },
      episodeId: "episode123",
      comment: "The animation was flawless!",
      parentCommentId: null,
      likes: 8,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T09:10:00Z",
    },
    {
      _id: "cmt3",
      userId: {
        _id: "usr3",
        username: "AnimeQueen",
        profileImage: image1
      },
      episodeId: "episode123",
      comment: "Plot twist had me gasping 😱",
      parentCommentId: null,
      likes: 15,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T09:20:00Z",
    },
    {
      _id: "cmt4",
      userId: {
        _id: "usr4",
        username: "NarutoRamen",
        profileImage: image1
      },
      episodeId: "episode123",
      comment: "Soundtrack gave me chills.",
      parentCommentId: null,
      likes: 5,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T09:30:00Z",
    },
    {
      _id: "cmt5",
      userId: {
        _id: "usr5",
        username: "MangaLover",
        profileImage:image1
      },
      episodeId: "episode123",
      comment: "Way better than the manga!",
      parentCommentId: null,
      likes: 3,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T09:40:00Z",
    },
    {
      _id: "cmt6",
      userId: {
        _id: "usr6",
        username: "YukiSnow",
        profileImage: image1
      },
      episodeId: "episode123",
      comment: "This is a reply to the top comment.",
      parentCommentId: "cmt1",
      likes: 2,
      deleted: false,
      depth: 1,
      createdAt: "2025-05-01T09:45:00Z",
    },
    {
      _id: "cmt7",
      userId: {
        _id: "usr7",
        username: "SenpaiSpotter",
        profileImage: image1
      },
      episodeId: "episode123",
      comment: "Felt like a movie production.",
      parentCommentId: null,
      likes: 6,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T09:50:00Z",
    },
    {
      _id: "cmt8",
      userId: {
        _id: "usr8",
        username: "ChibiMaster",
        profileImage: image1
      },
      episodeId: "episode123",
      comment: "The pacing was perfect.",
      parentCommentId: null,
      likes: 4,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T10:00:00Z",
    },
    {
      _id: "cmt9",
      userId: {
        _id: "usr9",
        username: "KawaiiBaka",
        profileImage:image1
      },
      episodeId: "episode123",
      comment: "Wish it was longer 🥲",
      parentCommentId: null,
      likes: 7,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T10:10:00Z",
    },
    {
      _id: "cmt10",
      userId: {
        _id: "usr10",
        username: "ZenitsuMain",
        profileImage:image1
      },
      episodeId: "episode123",
      comment: "This is why I love anime!",
      parentCommentId: null,
      likes: 10,
      deleted: false,
      depth: 0,
      createdAt: "2025-05-01T10:20:00Z",
    },
  ];
  