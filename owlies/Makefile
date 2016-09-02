
OWLIES_LIBS ?= -lpthread -lm
SHARED ?= -fPIC --shared
PHYSIC_PATH ?= physics
BUILD_PATH ?= ../luaclib/owlies

LUA_INC ?= ../3rd/lua

CFLAGS = -g -O2 -Wall -I$(LUA_INC)

$(BUILD_PATH) :
	mkdir $(BUILD_PATH)

all: $(BUILD_PATH)/physic.so 

$(BUILD_PATH)/physic.so : $(PHYSIC_PATH)/physic.c | $(BUILD_PATH)
	$(CC) $(CFLAGS) $(SHARED) $(OWLIES_LIBS) -o $@ $(PHYSIC_PATH)/physic.c
  
clean:
	rm -f $(BUILD_PATH)/*.so

