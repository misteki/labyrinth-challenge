# Making Sense Labyrinth technical challenge

## The solution
Some comments about my solution to the challenge:
* The tests have been very slightly changed to adjust to the way I handle keydown events. No new tests have been added.
* The Styling and Restart nice to have features have been implemented.
* Every declaration has been made on the smallest scope possible, that is, everything is declared on the same file of the component it´s used in. Only when something is used on more than one place I've hoisted it to a higher level in the file hierarchy. This is the case of some shared types, which I've put in the `src/solution/types.ts`.
* No other parts of the provided app has been customized or changed.

## Screenshots
> <br/> ![Initial](new-screen-initial.png)
> <br/> ![Win](new-screen-win.png)
> <br/> ![Lose](lose-screen-lose.png)