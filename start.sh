#!/bin/bash

motion -c motion.conf &

(cd server/ && yarn serve)
