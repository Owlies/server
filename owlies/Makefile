
OWLIES_LIBS ?= -lpthread -lm
SHARED ?= -fPIC --shared
LUALIB_SRC_PATH ?= owlies-lualib-src

LUA_INC ?= ../3rd/lua
LUALIB_INC ?= ../lualib-src
SKYNET_INC ?= ../skynet-src
BUILD_PATH ?= ../luaclib/owlies

CFLAGS = -g -O2 -Wall -I$(LUA_INC) -I$(LUALIB_INC) -I$(SKYNET_INC)

$(BUILD_PATH) :
	mkdir $(BUILD_PATH)

all: $(BUILD_PATH)/physic.so $(BUILD_PATH)/protobufLoader.so

$(BUILD_PATH)/physic.so : physics/physic.c | $(BUILD_PATH)
	$(CC) $(CFLAGS) $(SHARED) $(OWLIES_LIBS) -o $@ physics/physic.c

$(BUILD_PATH)/protobufLoader.so : $(LUALIB_SRC_PATH)/protobufs/lua-owlies-protobufLoader.c | $(BUILD_PATH)
	$(CC) $(CFLAGS) $(SHARED) $(OWLIES_LIBS) -o $@ $(LUALIB_SRC_PATH)/protobufs/lua-owlies-protobufLoader.c
clean:
	rm -f $(BUILD_PATH)/*.so

