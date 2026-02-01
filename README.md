### Test user info:

email: taylor+clerk_test@example.com
password: Gnarlywharl1
verification code: 424242

### What requirements did you achieve?

I believe I have achieved all of the standard requirements and one of the stretch goals (users can delete posts).

### Were there any requirements or goals that you were unable to achieve? If so, what was it that you found difficult about these tasks?

I tried to implement both an edit post and a likes counter to my app. The edit function appears to work but when submitting the change, it doesn't update on the database, therefore the update hasn't actually worked. I'm not quite sure what went wrong here as it wasn't coming up with any errors. I couldn't quite figure out how to implement the like "action" for the button which incremented the likes for each post on the feed (I commented out this code so it didn't break my page).

### Feedback requested:

- If you can figure out why my data was not submitting to the database for the edit function, that would be helpful.
- I also couldn't figure out how to change the size of the clerk avatar when the user is signed in. I tried inspecting the document and using the built-in className to style it, as well as giving it its' own className and trying to style it but nothing worked.
- I tried to make a join table to be able to extract user information and post information in the same db query, but I couldn't get it to work. Is the way I have done it (using separate queries from both tables) an okay way to extract both the user and win information?

### What useful external sources helped you complete the assignment (e.g Youtube tutorials)?

- I used ChatGTP for inspiration for the idea of Tiny Wins as well as the wireframes.
- Radix-UI for the icons, dialog, and tooltips.
- Figma for planning and user flow
- Trello for organising tasks (although I forgot to use it for the rest of the time after the first day).

### What errors or bugs did you encounter while completing your assignment? How did you solve them?

- My console.log() stopped working briefly so I couldn't use this for debugging, but I closed down my VS Code and browser and then it worked again.
- The initial errors I had were to do with the routes I had set up but Manny and Bertie helped with these.
- I had an error that kept coming up to do with the date being in object format and needing to be converted to a string to be rendered on the page. I used the toString() method and then was able to slice it so it didn't show the time as well (which was always midnight).
- I'm not sure what is happening either but when "signing up" as a new user, there is an error happening after the user creates their profile. It works fine on localhost and I have checked that my env variables match on Vercel.

### What went really well and what could have gone better?

I'm happy that I got most of the basic functionality finished before the weekend.

The styling is again very basic but now that there are more pages/routes to style, it takes a lot longer to do.

I would have liked to have more time to get more of the stretch goals completed, but I did need to dedicate more time to interview prep for my interview on Monday.
