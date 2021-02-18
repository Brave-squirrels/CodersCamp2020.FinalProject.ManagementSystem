#!/bin/bash

COMMAND="$*"

if [[ -z ${COMMAND} ]]; then
    COMMAND="dev"
fi

exec bash -c "yarn ${COMMAND}"