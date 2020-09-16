import React from 'react'
import {Flex, Box, Text, Link} from 'rebass'

export default function About() {
  return (
    <Text
      sx={{
        color: 'foreground',
        fontFamily: 'body',
        lineHeight: 'body'
      }}
    >
      <p>
        For those unfamiliar, <Link href="https://en.wikipedia.org/wiki/Knights_and_Knaves" target="_blank" rel="noopener noreferrer" sx={{fontWeight:'700',color:'lightgreen', textDecoration:'none'}}>Knights & Knaves</Link> is a type of logic puzzle in which you, the puzzle solver find yourself on an island with four types of inhabitants: Knights, Knaves, Dragons, and Monks. You encounter a group of islanders passing by and must determine their identities from only what they say. Knights always speak the truth; Knaves always lie; Dragons speak the truth unless a Knight is present, in which case they only lie; and Monks say whatever they please. In this game version of Knights & Knaves, you can specify how many islanders you encounter, with number of islanders serving as a rough proxy of difficulty.
      </p>
      <p>
        Unlike in some versions of the puzzles, these islanders are silent until you ask them yes-no questions. For now, you can only ask questions that contain one predicate. Connectives are coming soon. Also for now, you can choose freely which islander to direct your questions to. Your goal is to solve the puzzle, i.e. determine your characters' identities, by asking as few questions as possible. So choose carefully!
      </p>
      <p>
        We also imagine other versions of the game in which certain mechanics force your hand, e.g. a limit on the number of questions you can ask each character, or only a random subset of the predicates are available to you each turn. For anyone playtesting, we'd love your feedback on these sorts of modes and how to strike a balance between a pure test of logic skills and continuous challenge and replayability.
      </p>
      <p>
        This game is designed to be played as a team (although you can certainly play alone), and it is intended to be played while your team is in contact, likely via a voice or video call. Each player will receive live updates but only at the end of each turn, so you may find that screenshare is handy. We hope to add live updates as players type, but that isn't happening yet. Thus, your team will need to either assign a scribe or coordinate who is taking each turn. This is particularly important on the next screen where you will number and name your islanders. Only the first submission will be accepted by the game. As soon as the first teammate hits submit, your whole team will be redirected to the game interface.
        </p>
    </Text>
  )
}
