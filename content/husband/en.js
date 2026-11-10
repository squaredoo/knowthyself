SQ.register("husband", "en", {
  meta: {
    title: "Are You a Good Husband? | Self-Assessment Portal",
    desc: "A short self-assessment for husbands. Get your score and practical advice to improve your marriage."
  },
  intro: {
    title: "Are You a Good Husband?",
    subtitle: "A self-assessment inspired by a sermon by Sheikh Dr. Hassan Al-Balushi",
    body: "<p>In his sermon, Sheikh Dr. Hassan Al-Balushi asks an important question: <strong>“Are you a good husband?”</strong><br>This self-assessment helps you look honestly at yourself and find your strengths and weaknesses in your marriage.</p>"
  },
  axes: {
    a1: {
      title: "Emotional responsibility",
      desc: [
        "Taking responsibility for the emotional side of the marriage, built on three pillars:",
        {
          list: [
            "<strong>Safety:</strong> your wife feels safe with you",
            "<strong>Friendship:</strong> you are a true friend to your wife",
            "<strong>Respect:</strong> respecting your wife as a person and a blessing"
          ]
        }
      ]
    },
    a2: {
      title: "Practical responsibility",
      desc: [
        "Taking the lead in managing the practical side of the marriage:",
        {
          list: [
            "<strong>Initiative:</strong> breaking routine and renewing the relationship",
            "<strong>Boundaries:</strong> protecting the home and managing external relationships",
            "<strong>Partnership:</strong> sharing responsibilities and decisions"
          ]
        }
      ]
    }
  },
  pillars: {
    safety: {
      name: "Safety",
      heading: "🛡️ Safety"
    },
    friendship: {
      name: "Friendship",
      heading: "🤝 Friendship"
    },
    respect: {
      name: "Respect",
      heading: "🙏 Respect"
    },
    initiative: {
      name: "Initiative",
      heading: "🚀 Initiative"
    },
    boundaries: {
      name: "Boundaries",
      heading: "🏠 Boundaries"
    },
    partnership: {
      name: "Partnership",
      heading: "🤝 Partnership"
    }
  },
  questions: [
    "My wife turns to me when she faces a problem or emotional stress",
    "I listen to my wife and let her share her worries without interrupting",
    "My reactions are predictable, my mood is steady (not volatile)",
    "My wife is not afraid of my reaction when she wants to tell me something",
    "I’m transparent with my wife and don’t hide important matters",
    "My wife enjoys spending time with me, and I do too",
    "I care about the details of my wife’s life and ask about her day",
    "I listen with real engagement and respond to what she says",
    "I praise my wife and appreciate her efforts at home",
    "I regularly express love and affection to my wife",
    "I don’t use insulting or hurtful words, even when angry",
    "I never raise a hand against my wife, whatever the disagreement",
    "I admit my mistakes and I’m willing to change",
    "After any conflict, I take the lead to repair the relationship",
    "I take initiative to break routine and refresh our marriage",
    "I understand my wife’s emotional ups and downs and handle them wisely",
    "I manage the relationship between my wife and my family with balance",
    "I protect our privacy and don’t share our home secrets",
    "I fulfill my duties and responsibilities toward the home and family",
    "I help my wife with the house and the children",
    "I consult my wife and involve her in important decisions"
  ],
  bands: [
    {
      title: "Excellent. You’re doing very well.",
      text: "Your score suggests strong awareness and consistent effort."
    },
    {
      title: "Good. You’re on the right track.",
      text: "You hit the target (60%). Review the advice to level up."
    },
    {
      title: "You need more effort and consistency.",
      text: "There’s room to improve. Focus on the weakest points and change one thing daily."
    },
    {
      title: "Time for serious change.",
      text: "Don’t panic. Start with one serious step today."
    }
  ],
  overall: [
    {
      title: "Excellent. You’re doing very well.",
      text: [
        "Your score shows strong awareness and steady effort in building a successful marriage. Keep it up.",
        {
          ar: "خيركم خيركم لأهله، وأنا خيركم لأهلي",
          meaning: "“The best of you are those who are best to their families, and I am the best of you to my family.”",
          src: "The Prophet Muhammad (peace be upon him and his family)"
        }
      ]
    },
    {
      title: "Good. You’re on the right track.",
      text: [
        "You reached the goal (60%), which means you are a good husband. Read the advice below to become even better."
      ]
    },
    {
      title: "You need more effort and consistency.",
      text: [
        "There is plenty of room to improve. Focus on your weakest points and start with one small change each day."
      ]
    },
    {
      title: "Time for serious change.",
      text: [
        "Don’t worry – admitting the problem is half the solution! Every day is a new chance to be a better husband.",
        {
          ar: "أفضل الأعمال ما أكرهت نفسك عليه",
          meaning: "“The best deeds are those you make yourself do.”",
          src: "Imam Ali (peace be upon him)"
        }
      ]
    }
  ],
  feedback: {
    safety: {
      excellent: {
        title: "🛡️ Strong in Safety",
        text: "You create emotional safety. Keep being steady, calm, and reliable."
      },
      good: {
        title: "🛡️ Good in Safety",
        text: "You’re doing well. Aim for more consistency in reactions and more clarity in communication."
      },
      needsWork: {
        title: "🛡️ Safety needs work",
        text: [
          "Your wife needs to feel safe with you. Work on calm reactions and clear communication.",
          {
            ar: "رحم الله عبداً أحسن فيما بينه وبين زوجته",
            meaning: "“May Allah have mercy on the servant who does well in what is between him and his wife.”",
            src: "Imam al-Sadiq (peace be upon him)"
          }
        ],
        tips: [
          "Practice listening without interrupting",
          "Keep your reactions calm and predictable",
          "Be transparent about important matters"
        ]
      }
    },
    friendship: {
      excellent: {
        title: "🤝 Strong in Friendship",
        text: "You treat your wife as a true friend. Keep the warmth and attention going."
      },
      good: {
        title: "🤝 Good in Friendship",
        text: "Good connection. Add more quality time and express affection more often."
      },
      needsWork: {
        title: "🤝 Friendship needs work",
        text: [
          "Friendship is the foundation of a happy marriage. The Prophet (peace be upon him and his family) joked with his wives and listened to them.",
          {
            ar: "خيركم خيركم لأهله",
            meaning: "“The best of you are those who are best to their families.”",
            src: "The Prophet Muhammad (peace be upon him and his family)"
          }
        ],
        tips: [
          "Set a daily time to talk",
          "Ask about her day and details",
          "Express love with words and actions"
        ]
      }
    },
    respect: {
      excellent: {
        title: "🙏 Strong in Respect",
        text: "Respect is clear in your behavior. That’s a key foundation."
      },
      good: {
        title: "🙏 Good in Respect",
        text: "Respect is present. Keep initiating repair after disagreements and accept feedback."
      },
      needsWork: {
        title: "🙏 Respect needs work",
        text: [
          "Respect is a red line. Never raise your voice or your hand.",
          {
            ar: "فإنهن أمانات الله عندكم، فلا تضاروهن",
            meaning: "“They are a trust from Allah with you, so do not harm them.”",
            src: "Imam Ali (peace be upon him)"
          }
        ],
        tips: [
          "Avoid hurtful words even when angry",
          "Apologize and repair quickly",
          "Be open to change and feedback"
        ]
      }
    },
    initiative: {
      excellent: {
        title: "🚀 Strong in Initiative",
        text: "You refresh the relationship and break routine. Keep the positive surprises."
      },
      good: {
        title: "🚀 Good in Initiative",
        text: "Nice efforts. Add more renewal and handle mood swings wisely."
      },
      needsWork: {
        title: "🚀 Initiative needs work",
        text: "Routine drains marriages. Lead with small renewal steps.",
        tips: [
          "Plan small surprises regularly",
          "Go out together even briefly",
          "Don’t take mood changes personally"
        ]
      }
    },
    boundaries: {
      excellent: {
        title: "🏠 Strong in Boundaries",
        text: "You protect the home and keep balance with family relationships."
      },
      good: {
        title: "🏠 Good in Boundaries",
        text: "Good boundary management. Keep privacy and balance steady."
      },
      needsWork: {
        title: "🏠 Boundaries need work",
        text: "Your home needs privacy and protection. Keep secrets inside and act fairly.",
        tips: [
          "Don’t share private matters",
          "Balance your wife’s rights with family ties",
          "Keep key decisions between you two"
        ]
      }
    },
    partnership: {
      excellent: {
        title: "🤝 Strong in Partnership",
        text: "You act like a real partner: responsibilities, help, and shared decisions."
      },
      good: {
        title: "🤝 Good in Partnership",
        text: "Solid partnership. Help more at home and involve her more in decisions."
      },
      needsWork: {
        title: "🤝 Partnership needs work",
        text: [
          "Marriage is a partnership. The Prophet (peace be upon him and his family) helped his family and consulted his wives.",
          {
            ar: "كان يخصف نعله ويرقع ثوبه ويخدم نفسه",
            meaning: "“He mended his own sandals, patched his own clothes and looked after himself.”",
            src: "Description of the Prophet (peace be upon him and his family)"
          }
        ],
        tips: [
          "Help at home consistently",
          "Consult her on decisions",
          "Carry your full family responsibilities"
        ]
      }
    }
  },
  promise: {
    intro: "Write a promise to yourself about what you want to improve.<br>This is between you and yourself, commitment is the first step toward change.",
    suggestions: [
      "I will set a daily time to talk with my wife",
      "I will express appreciation and affection regularly"
    ]
  }
});
