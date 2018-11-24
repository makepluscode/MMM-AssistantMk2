//
// Module : MMM-AssistantMk2
//
var ytp
Module.register("MMM-AssistantMk2", {
  defaults: {
    verbose:false,
    projectId: "", // Google Assistant ProjectId (Required only when you use gAction.)
    useGactionCLI: false,
    startChime: "connection.mp3",
    deviceModelId: "", // It should be described in your config.json
    deviceInstanceId: "", // It should be described in your config.json
    deviceLocation: { // (optional)
      coordinates: { // set the latitude and longitude of the device (rf. mygeoposition.com)
        latitude: 51.5033640, // -90.0 - +90.0
        longitude: -0.1276250, // -180.0 - +180.0
      },
    },
    auth: {
      keyFilePath: "./credentials.json"
    },
    defaultProfile: "default",
    profiles: {
      "default" : {
        profileFile: "default.json",
        lang: "en-US"
        //currently available (estimation, not all tested):
        //  de-DE, en-AU, en-CA, en-GB, en-US, en-IN
        // fr-CA, fr-FR, it-IT, ja-JP, es-ES, es-MX, ko-KR, pt-BR
        // https://developers.google.com/assistant/sdk/reference/rpc/languages
      },
    },

    transcriptionHook: {
      "JOHNY_JOHNY": {
        pattern: "johny johny",
        command: "CMD_YESPAPA"
      },
      "JOHNNY_JOHNNY": {
        pattern: "johnny johnny",
        command: "CMD_YESPAPA"
      },
      "EATING_SUGAR": {
        pattern: "eating sugar",
        command: "CMD_NOPAPA"
      },
      "TELLING_LIE": {
        pattern: "telling lie",
        command: "CMD_NOPAPA"
      },
      "OPEN_YOUR_MOUSE": {
        pattern: "open your mouth",
        command: "CMD_AHAHAH"
      },
      "HIDE_ALL_MODULES": {
        pattern: "hide all",
        command: "HIDEMODULES"
      },
      "SHOW_ALL_MODULES": {
        pattern: "show all",
        command: "SHOWMODULES"
      },
      "SCREEN_ON": {
        pattern: "wake up",
        command: "SCREENON"
      },
      "SCREEN_OFF": {
        pattern: "go to sleep",
        command: "SCREENOFF"
      },
      "REBOOT": {
        pattern: "reboot yourself",
        command: "REBOOT"
      },
      "SHUTDOWN": {
        pattern: "shutdown yourself",
        command: "SHUTDOWN"
      }
    },
    action: {
      /*
      "com.example.commands.REBOOT" : {
        notification: "SHOW_ALERT",
        payload: {
          message: "You've ordered REBOOT",
          timer: 3000,
        }
      },
      "com.example.commands.PAGE" : {
        notification: (params) => {
          if (params.number) {
            return "PAGE_CHANGED"
          } else if (params.incordec == "INC") {
            return "PAGE_INCREMENT"
          } else {
            return "PAGE_DECREMENT"
          }
        },
        payload: (params) => {
          if (params.number) {
            return params.number
          } else {
            return null
          }
        }
      }
      */
    },

    command: {
      "CMD_YESPAPA": {
        notificationExec: {
          notification: "SAY_YESPAPA",
          payload: {
            message: "Yes, PaPa",
          }
        },
      },
      "CMD_NOPAPA": {
        notificationExec: {
          notification: "SAY_NOPAPA",
          payload: {
            message: "No, PaPa",
          }
        },
      },
      "CMD_AHAHAH": {
        notificationExec: {
          notification: "SAY_AHAHAH",
          payload: {
            message: "Ah Ah Ah",
          }
        },
      },
      "HIDEMODULES": {
        moduleExec: {
          module:()=>{
            return []
          },
          exec: (module, params, key) => {
            module.hide(1000, null, {lockString:"AMK2"})
          }
        }
      },
      "SHOWMODULES": {
        moduleExec: {
          module:[],
          exec: (module, params, key) => {
            module.show(1000, null, {lockString:"AMK2"})
          }
        }
      },
      "SCREENON": {
        shellExec: {
          exec: (params, key) => {
            return "~/MagicMirror/modules/MMM-AssistantMk2/scripts/screenon.sh"
            //return "ls -al"
          },
          options: (params, key)=> {
            return ""
          },
        }
      },
      "SCREENOFF": {
        shellExec: {
          exec: "~/MagicMirror/modules/MMM-AssistantMk2/scripts/screenoff.sh",
          options: null,
        }
      },
      "REBOOT": {
        /*
        notificationExec: {
          notification: "SHOW_ALERT",
          payload: {
            message: "You've ordered REBOOT. I'm showing just alert, but you can modify config.js to reboot really.",
            timer: 5000,
          }
        },
        */
        
        shellExec: {
          exec: "sudo reboot now"
        }
        
      },
      "SHUTDOWN": {
        /*
        notificationExec: {
          notification: (params, key) => {
            return "SHOW_ALERT"
          },
          payload: (params, key)=> {
            return {
              message: "You've ordered SHUTDOWN. I'm showing just alert, but you can modify config.js to reboot really.",
              timer: 5000,
            }
          }
        },
        */
        
        shellExec: {
          exec: "sudo shutdown now"
        }
        
      },
    },
    responseVoice: true, // If available, Assistant will response with her voice.
    responseScreen: true, // If available, Assistant will response with some rendered HTML
    responseAlert: true, // If available, Assistant will response with Alert module of MM
    // Sometimes, any response could not be returned.

    screenZoom: "80%",
    screenDuration: 0, //If you set 0, Screen Output will be closed after Response speech finishes.

    youtubeAutoplay: false,
    pauseOnYoutube:true,
    alertError: true,

    useWelcomeMessage: "",

    record: {
      sampleRate    : 16000,      // audio sample rate
      threshold     : 0.5,        // silence threshold (rec only)
      thresholdStart: null,       // silence threshold to start recording, overrides threshold (rec only)
      thresholdEnd  : null,       // silence threshold to end recording, overrides threshold (rec only)
      silence       : 1.0,        // seconds of silence before ending
      verbose       : false,      // log info to the console
      recordProgram : "arecord",  // Defaults to "arecord" - also supports "rec" and "sox"
      device        : null        // recording device (e.g.: "plughw:1")
    },

    play: {
      encodingOut: "MP3", //'MP3' or 'WAV' is available, but you might not need to modify this.
      sampleRateOut: 24000,
      playProgram: "mpg321", //Your prefer sound play program. By example, if you are running this on OSX, `afplay` could be available.
      playOption: [], // If you need additional options to use playProgram, describe here. (except filename)
      // e.g: ["-d", "", "-t", "100"]
    },

    onIdle: {
      timer: 1000*60*30, // if you don't want to use this feature, just set timer as `0` or command as ""
      command: "HIDEMODULES"
    },

    onActivate: {
      timer: 0,
      command: "SHOWMODULES"
    },

    notifications: {
      ASSISTANT_ACTIVATE: "ASSISTANT_ACTIVATE",
      ASSISTANT_DEACTIVATE: "ASSISTANT_CLEAR",
      ASSISTANT_ACTIVATED: "ASSISTANT_ACTIVATED",
      ASSISTANT_DEACTIVATED: "ASSISTANT_DEACTIVATED",
      ASSISTANT_ACTION: "ASSISTANT_ACTION",
      DEFAULT_HOOK_NOTIFICATION: "ASSISTANT_HOOK",
      TEXT_QUERY: "ASSISTANT_QUERY",
    }
  },

  getStyles: function () {
    return ["MMM-AssistantMk2.css"]
  },

  getCommands: function () {
    return [
      {
        command: "q",
        callback: "telegramCommand",
        description: "You can command `AssistantMk2` by text with this command."
      }
    ]
  },

  telegramCommand: function(command, handler) {
    if (command == "q" && handler.args) {
      handler.reply("TEXT", "AssistantMk2 will be activated")
      this.notificationReceived(this.config.notifications.TEXT_QUERY, handler.args, "MMM-TelegramBot")
    }
  },

  start: function () {
    this.config = this.configAssignment({}, this.defaults, this.config)
    this.sendSocketNotification("INIT", this.config)
    var assistant = new AssistantHelper(this.config)
    assistant.setProfile(this.config.profiles[this.config.defaultProfile])
    assistant.registerHelper("sendNotification" , (noti, payload)=> {
      this.sendNotification(noti, payload)
    })
    assistant.registerHelper("sendSocketNotification" , (noti, payload)=> {
      this.sendSocketNotification(noti, payload)
    })
    this.assistant = assistant
  },

  getDom : function() {
    return this.assistant.drawDom()
  },



  notificationReceived: function (notification, payload, sender) {
    switch(notification) {
      case "DOM_OBJECTS_CREATED":
        this.assistant.initializeAfterLoading(this.config)
        break
      case this.config.notifications.ASSISTANT_ACTIVATE:
        var profileKey = ""
        if (payload
          && payload.hasOwnProperty("profile")
          && payload.profile in this.config.profiles
        ) {
          profileKey = payload.profile
        } else {
          profileKey = this.config.defaultProfile
        }
        this.currentProfile = this.config.profiles[profileKey]
        this.assistant.activate(this.currentProfile)
        break
      case this.config.notifications.ASSISTANT_DEACTIVATE:
        this.assistant.clearResponse()
        this.assistant.deactivate()
        //this.hideScreen()
        break
      case this.config.notifications.TEXT_QUERY:
        if (typeof sender == "object") {
          sender = sender.name
        }
        this.currentProfile = this.config.profiles[this.config.defaultProfile]
        this.assistant.activate(this.currentProfile, payload, sender)
        break
    }
  },

  socketNotificationReceived: function (notification, payload) {
    switch(notification) {
      case "INITIALIZED":
        //do nothing
        if (this.config.useWelcomeMessage) {
          this.assistant.activate(this.config.profiles[this.config.defaultProfile], this.config.useWelcomeMessage)
          this.config.useWelcomeMessage = ""
        }
        break
      case "PREPARED":

        break
      case "MIC_ON": //necessary?????
        this.assistant.micStatus(true)
        break
      case "MIC_OFF":
        this.assistant.micStatus(false)
      case "SPEAKER_ON": //necessary?????
        this.assistant.speakerStatus(true)
        break
      case "SPEAKER_OFF":
        this.assistant.speakerStatus(false)
        break
      case "TRANSCRIPTION":
        this.assistant.transcription(payload)
        break
      case "RESPONSE_START":
        this.assistant.responseStart(payload)
        break
      case "RESPONSE_END":
        break
      case "CONVERSATION_END":
        this.assistant.conversationEnd(payload)
        break
      case "CONVERSATION_ERROR":
      case "ASSISTANT_ERROR":
        this.asistant.onError(notification)
        break
    }
  },

  configAssignment : function (result) {
    var stack = Array.prototype.slice.call(arguments, 1);
    var item;
    var key;
    while (stack.length) {
      item = stack.shift();
      for (key in item) {
        if (item.hasOwnProperty(key)) {
          if (
            typeof result[key] === "object"
            && result[key]
            && Object.prototype.toString.call(result[key]) !== "[object Array]"
          ) {
            if (typeof item[key] === "object" && item[key] !== null) {
              result[key] = this.configAssignment({}, result[key], item[key]);
            } else {
              result[key] = item[key];
            }
          } else {
            result[key] = item[key];
          }
        }
      }
    }
    return result;
  }
})

class AssistantHelper {
  constructor(config) {
    this.config = config
    this.helper = {}
    this.events = {}
    this.locked = false
    this.profile = null
    this.subdom = {
      mic: null,
      message: null,
      screen: null,
      youtube: null,
      wrapper: null
    }
    this.dom = this.prepareDom()
    this.status = "STANDBY" //STANDBY, READY, UNDERSTANDING, RESPONSING,
    this.nextQuery = ""
    this.screenTimer = null
    this.youtubePlaying = false
    this.idleTimer = null
  }

  registerHelper(name, cb) {
    this.helper[name] = cb
  }

  log (text) {
    if(this.config.verbose) {
      console.log("[AMK2] ", text)
    }
  }

  setProfile(profile) {
    this.profile = profile
  }

  configure(config) {
    this.config = config
  }

  initializeAfterLoading() {
    window.addEventListener("message", (e)=>{
      this.screenMessage(e.data)
    }, false)
    this.prepareYoutube()
  }

  prepareYoutube() {
    var tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    var firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      this.log("YouTube iframe API is ready.")
    }
  }

  prepareDom() {
    var wrapper = document.createElement("div")
    wrapper.id = "ASSISTANT"
    wrapper.className = "STANDBY"

    var micImg = document.createElement("div")
    micImg.id = "ASSISTANT_MIC"

    micImg.onclick = (e)=> {
      e.stopPropagation()
      this.activate(this.profile)
    }

    wrapper.appendChild(micImg)

    var message = document.createElement("div")
    message.id = "ASSISTANT_MESSAGE"
    wrapper.appendChild(message)

    var screenOutput = document.createElement("iframe")
    screenOutput.id = "ASSISTANT_SCREEN"
    wrapper.appendChild(screenOutput)

    var ytOutput = document.createElement("div")
    ytOutput.id = "ASSISTANT_YOUTUBE"
    wrapper.appendChild(ytOutput)

    this.subdom.mic = micImg
    this.subdom.message = message
    this.subdom.screen = screenOutput
    this.subdom.youtube = ytOutput
    this.subdom.wrapper = wrapper

    return wrapper
  }

  on(eventName, callback=()=>{}) {
    this.events[eventName] = callback
  }

  off(eventName) {
    if (this.events.hasOwnProperty(eventName)) {
      delete this.events[eventName]
    }
  }

  emit(eventName, payload) {
    if (this.events.hasOwnProperty(eventName)) {
      var fn = this.events[eventName]
      if (typeof fn == "function") {
        fn(payload)
      }
    }
  }

  transcription(payload) {
    this.changeStatus((payload.done) ? "UNDERSTANDING" : null)
    this.subdom.message.innerHTML = "<p>" + payload.transcription + "</p>"
  }

  changeStatus(key) {
    if (key) {
      this.status = key
      this.subdom.wrapper.className = key
    }

    if (key == "STANDBY") {
      this.subdom.mic.className = ""
    }
  }

  getStatus() {
    return this.status
  }

  isLocked() {
    return this.locked
  }

  drawDom() {
    return this.dom
  }

  sendSocketNotification(noti, payload) {
    this.helper["sendSocketNotification"](noti, payload)
  }

  sendNotification(noti, payload) {
    this.helper["sendNotification"](noti, payload)
  }

  onError(error) {
    this.changeStatus("ERROR")
    this.subdom.message.innerHTML = "<p>" + error + "</p>"
    setTimeout(()=>{
      this.clearResponse()
      this.deactivate()
    }, 3000)
  }

  activate(profile, textQuery=null, sender=null, id=null) {
    if (this.youtubePlaying && this.config.pauseOnYoutube) {
      this.log("Assistant will not work during Youtube playing.")
      return false
    }
    if (this.status == "STANDBY" || this.status == "UNDERSTANDING" || this.status == "RESPONSING") {
      this.clearResponse()
      //this.deactivate()
      this.changeStatus("READY")
      this.sendNotification(this.config.notifications.ASSISTANT_ACTIVATED)
      this.sendSocketNotification("START", {profile:profile, textQuery:textQuery, sender:sender, id:id})
      if (this.config.onActivate) {
        setTimeout(()=>{
          this.doCommand(this.config.onActivate, "onActivate")
        }, this.config.onActivate.timer)
      }

      if (this.config.onIdle && this.config.onIdle.timer > 0) {
        clearTimeout(this.idleTimer)
        this.idleTimer = setTimeout(()=>{
          this.doCommand(this.config.onIdle, "onIdle")
        }, this.config.onIdle.timer)
      }
      return true
    } else {
      this.log("Assistant is busy.")
      return false
    }
  }

  deactivate(cb=()=>{}) {
    //this.clearResponse()
    this.changeStatus("STANDBY")
    this.sendNotification(this.config.notifications.ASSISTANT_DEACTIVATED)
    cb()
  }

  clearResponse() {
    this.subdom.message.innerHTML = ""
    this.subdom.youtube.innerHTML = ""
    this.subdom.youtube.style.display = "none"
    this.youtubePlaying = false
    //this.sendSocketNotification(this.config.notifications.ASSISTANT_DEACTIVATED)
  }

  micStatus(bool) {
    this.subdom.mic.className = (bool) ? "MIC" : ""
  }

  speakerStatus(bool) {
    this.subdom.mic.className = (bool) ? "SPEAKER" : ""
  }

  responseStart(payload) {
    if (this.config.responseScreen && payload.screenOutput) {
      this.subdom.screen.src = "/modules/MMM-AssistantMk2/tmp/temp.html"
      clearTimeout(this.screenTimer)
      setTimeout(()=>{
        this.subdom.screen.className = "show"
      },10)
    }
    if (!this.config.responseScreen && payload.foundTextResponse) {
      this.alert(payload.foundTextResponse)
    }
  }

  responseEnd(after=()=>{}, force=false) {
    if (this.config.responseScreen) {
      if (this.config.screenDuration > 0 && !force) {
        this.screenTimer = setTimeout(()=>{
          this.subdom.screen.className = "hide"
          after()
        }, this.config.screenDuration)
      } else {
        this.subdom.screen.className = "hide"
        after()
      }
    } else {
      this.sendNotification("HIDE_ALERT")
      after()
    }
  }

  alert(message) {
    if(this.config.responseAlert) {
      this.log(message)
      var timer = (this.config.screenDuration > 3000) ? this.config.screenDuration : 3000
      this.sendNotification("SHOW_ALERT", {
        title: "MMM-AssistanMk2",
        message: message,
        timer: timer
      })
    }
  }



  foundError(error) {
    if (error) {
      var message = ""
      if (typeof error == "string") {
        message = error
      } else {
        message = error.toString()
      }
      if (this.config.alertError) {
        this.onError(message)
        this.alert(message)
      }
      this.log("Error:" + message)
    }
  }

  doCommand (hooked, key) {
    var hook
    if (this.config.command.hasOwnProperty(hooked.command)) {
      hook = this.config.command[hooked.command]
    } else {
      return
    }
    if (hook.hasOwnProperty("notificationExec")) {
      var ne = hook.notificationExec
      var notification = (ne.notification) ? ne.notification : this.config.notifications.DEFAULT_HOOK_NOTIFICATION
      var fn = (typeof notification == "function") ? notification(hook.payload, key) : notification
      var payload = (ne.payload) ? ne.payload : hook.payload

      var fp = (typeof payload == "function") ? payload(hook.payload, key) : Object.assign({}, payload)
        this.sendNotification(fn, fp)
    }

    if (hook.hasOwnProperty("shellExec")) {
      var se = hook.shellExec
      if (se.exec) {
        var fs = (typeof se.exec == "function") ? se.exec(hook.payload, key) : se.exec
        var options = (se.options) ? se.options : null
        var fo = (typeof options == "function") ? options(hook.payload, key) : Object.assign({}, options)
        this.sendSocketNotification("SHELLEXEC", {command:fs, options:fo})
      }
    }
    if (hook.hasOwnProperty("moduleExec")) {
      var me = hook.moduleExec
      var m = me.module
      if (typeof me.module == 'function') {
        m = me.module(hook.payload)
      }
      if (Array.isArray(m)) {
        MM.getModules().enumerate((module)=>{
          if (m.length == 0 || module.name in m) {
            var payload = Object.assign({}, hook.payload)
            me.exec(module, payload, key)
          }
        })
      }
    }
  }

  foundHook (foundHook) {
    if (foundHook.length > 0) {
      for(var i in foundHook) {
        var res = foundHook[i]
        var hook = this.config.transcriptionHook[res.key]
        this.doCommand(hook, res.key)
      }
    }
  }

  foundAction(foundAction) {
    if (foundAction) {
      if (this.config.action.hasOwnProperty(foundAction.command)) {
        var action = this.config.action[foundAction.command]
        this.doCommand(action, foundAction.params)
      }
    }
  }

  conversationEnd(payload) {
    this.foundError(payload.error)
    this.foundAction(payload.foundAction)
    this.foundHook(payload.foundHook)


    if (payload.foundVideo || payload.foundVideoList) {
      if (this.config.youtubeAutoplay) {
        var after = ()=>{}
        if (this.config.pauseOnYoutube) {
          after = ()=>{
            this.clearResponse()
            this.deactivate()
          }
        }
        if (payload.foundVideo) {
          this.playYoutubeVideo("video", payload.foundVideo, after)
        }
        if (payload.foundVideoList) {
          this.playYoutubeVideo("videolist", payload.foundVideoList, after)
        }
        if (!this.config.pauseOnYoutube) {
          this.deactivate()
        }
      }
    } else {
      var thenAfter
      if(payload.continueConversation) {
        thenAfter = ()=> {this.activate(this.profile)}
        this.responseEnd(thenAfter, true)

      } else {
        thenAfter = () => {
          this.clearResponse()
          this.deactivate()
        }
        this.responseEnd(thenAfter)
      }
    }
  }

  playYoutubeVideo(type, id, cb=()=>{}) {
    this.responseEnd(()=>{}, true)
    var onClose = (holder, cb=()=>{}) => {
      this.youtubePlaying = false
      holder.style.display = "none"
      holder.innerHTML = ""
      cb()
    }
    var holder = this.subdom.youtube
    holder.innerHTML = ""
    holder.style.display = "block"

    var yt = document.createElement("div")
    yt.id = "YOUTUBE_" + id
    holder.appendChild(yt)

    var close = document.createElement("div")
    close.className = "button button_close"
    close.onclick = (e)=>{
      e.stopPropagation()
      ytp.stopVideo()
      onClose(holder, cb)
    }
    holder.appendChild(close)
    this.youtubePlaying = true
    ytp = new YT.Player(yt.id, {
      playerVars: {
        "controls": 0,
        "loop": 1,
        "rel": 0,
      },
      events: {
        "onReady": (event)=>{
          if (type == "video") {
            event.target.loadVideoById(id)
          } else {
            event.target.loadPlaylist(id)
          }
          event.target.playVideo()
        },
        "onStateChange": (event)=>{
          if (event.data == 0) {
            setTimeout(()=>{
              onClose(holder, cb)
            }, 100)
          }
        },
        "onError": (event)=> {
          this.log("youtube error:", id, event)
        }
      }
    })
  }

  screenMessage(obj) {
    const ytVideoPattern = /youtube\.com\/watch\?v=([a-zA-Z0-9-_]*)$/ig
    if (obj.hasOwnProperty("url")) {
      var re = ytVideoPattern.exec(obj.url.href)
      if (re.length > 0) {
        this.playYoutubeVideo(re[1])
      } else {
        //external link
      }
    }
    if (obj.hasOwnProperty("query")) {
      if(obj.query.queryText) {
        //this.nextQuery = obj.query.queryText
        this.deactivate(()=>{
          this.activate(this.profile, obj.query.queryText)
        })
      }
    }
  }
}
