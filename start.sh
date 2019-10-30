#!/bin/bash

motion -c motion.conf &

node ./server/index.js

