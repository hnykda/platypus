# Reasonings

1. An entity `ReasoningItem` is the main generic polymorphic entity that holds some "fact", they
    represent some information about the world. (it's basically an evidence?)
2. All of these are `ReasoningItem`s:
    - `Statement`, such as "Biden is currently a US President", or "1 liter of water weights 1 kilogram".
        Any information can be a statement, it can have various degrees of certainty, can be bounded e.g. by time, etc.
    - `Estimate`, such as "The population of the US is 330 million", any value estimate
    - `Forecast` of a specific forecasting question, including both percentages or continuous values
    - the `ReasoningItem` can have various shapes, like numbers, distributions, just unclear statements such as real-human citations, etc.
3. You can do various operations on `ReasoningItem`s:
    - edit or add new `ReasoningItem`
    - aggregate `ReasoningItem`s into a new `ReasoningItem`, recursively
    - delete `ReasoningItem`
4. Our operations can be classified into something like:
    1. collect more information
        - collect citations/excerpts from the internet
        - add some manually such as when creating a new ActorProfile
            - adding dimensions is also basically some kind of a ReasoningItem distillation
        - Research loop is closer to this - generating a lot of unitary-kind of ReasoningItems.
    2. the tools we have differ widely in complexity and sophistication. If a single statement/fact is the simplest example, then e.g. a Forecast or Report output is the most complex we have. But output of Report is also a `ReasoningItem`, with many reasoning subitems such as subquestions, estimates used in these subquestions, and so on.
    3. it's messy, but it's necessary. You want to do various things in various times, e.g. sometimes dig deeper for more facts out there, then do more of reasoning.

# Workflow
0. You start with an intent to know something. 
1. if it's a 
1. you start with a question. You can directly ask to find all relevant pieces of information that are out there, be it the internet or LLMs internal memory. It goes out there, it might even do some kind of "What am I even trying to ask", similar to "Search the future" thing. Could be "Help me to find what I want to ask or know". The person could just put something in, and we would help them to generate some kind of subquestions or something.

# Architecture

1. simple project level data mutations can be done on the client side.
2. reasoning bits