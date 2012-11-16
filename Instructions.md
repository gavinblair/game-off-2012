To install on server:

-Files from game server folder can go anywhere on the server, but must be in same folder, and folder must contain the modules for "threads_a_gogo" and "websocket".
** threads_a_gogo will only work on linux **
to install the modules, run these commands from console (must have root access)

npm install thread_a_gogo
npm install websocket

-File in game client folder is to be put in the public_html dir, accessible outside the network. 

run server from console using this command

node game_server.js

console will display server messages

browse to game.html on a browser, and it should draw the red box at the bottom.