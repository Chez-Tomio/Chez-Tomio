#!/bin/bash

dependencies=()
scopes=""
command_args=""
is_in_scope_arg="false"

for arg in $@
do
    if [ $is_in_scope_arg == "true" ]; then
        scopes+="@chez-tomio/$arg "
    elif [ $arg == "-D" ]; then
        command_args="-D"
    elif [ $arg == "-P" ]; then
        command_args="-P"
    elif [ $arg == "--scope" ]; then
        is_in_scope_arg="true"
    else
        dependencies+=($arg)
    fi
done

for dependency in "${dependencies[@]}"
do
    yarn lerna add $dependency $command_args --scope $scopes
done
