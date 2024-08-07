/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/occt-import-js@0.0.22/dist/occt-import-js.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var occtimportjs = (() => {
  var r = "undefined" != typeof document ? document.currentScript?.src : void 0
  return (
    "undefined" != typeof __filename && (r ||= __filename),
    function (e = {}) {
      var t,
        n,
        o,
        a,
        i,
        s = Object.assign({}, e),
        u = new Promise((r, e) => {
          ;(t = r), (n = e)
        }),
        l = "object" == typeof window,
        d = "function" == typeof importScripts,
        c = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
        f = Object.assign({}, s),
        m = "./this.program",
        h = (r, e) => {
          throw e
        },
        p = ""
      if (c) {
        var v = require("fs"),
          g = require("path")
        ;(p = d ? g.dirname(p) + "/" : __dirname + "/"),
          (o = (r, e) => ((r = V(r) ? new URL(r) : g.normalize(r)), v.readFileSync(r, e ? void 0 : "utf8"))),
          (i = r => {
            var e = o(r, !0)
            return e.buffer || (e = new Uint8Array(e)), e
          }),
          (a = (r, e, t, n = !0) => {
            ;(r = V(r) ? new URL(r) : g.normalize(r)),
              v.readFile(r, n ? void 0 : "utf8", (r, o) => {
                r ? t(r) : e(n ? o.buffer : o)
              })
          }),
          !s.thisProgram && process.argv.length > 1 && (m = process.argv[1].replace(/\\/g, "/")),
          process.argv.slice(2),
          (h = (r, e) => {
            throw ((process.exitCode = r), e)
          })
      } else
        (l || d) &&
          (d
            ? (p = self.location.href)
            : "undefined" != typeof document && document.currentScript && (p = document.currentScript.src),
          r && (p = r),
          (p = p.startsWith("blob:") ? "" : p.substr(0, p.replace(/[?#].*/, "").lastIndexOf("/") + 1)),
          (o = r => {
            var e = new XMLHttpRequest()
            return e.open("GET", r, !1), e.send(null), e.responseText
          }),
          d &&
            (i = r => {
              var e = new XMLHttpRequest()
              return e.open("GET", r, !1), (e.responseType = "arraybuffer"), e.send(null), new Uint8Array(e.response)
            }),
          (a = (r, e, t) => {
            var n = new XMLHttpRequest()
            n.open("GET", r, !0),
              (n.responseType = "arraybuffer"),
              (n.onload = () => {
                200 == n.status || (0 == n.status && n.response) ? e(n.response) : t()
              }),
              (n.onerror = t),
              n.send(null)
          }))
      var w,
        y,
        E = s.print || console.log.bind(console),
        _ = s.printErr || console.error.bind(console)
      Object.assign(s, f),
        (f = null),
        s.arguments && s.arguments,
        s.thisProgram && (m = s.thisProgram),
        s.quit && (h = s.quit),
        s.wasmBinary && (w = s.wasmBinary)
      var b,
        k,
        F,
        S,
        D,
        A,
        M,
        P,
        T = !1
      function C() {
        var r = y.buffer
        ;(s.HEAP8 = b = new Int8Array(r)),
          (s.HEAP16 = F = new Int16Array(r)),
          (s.HEAPU8 = k = new Uint8Array(r)),
          (s.HEAPU16 = S = new Uint16Array(r)),
          (s.HEAP32 = D = new Int32Array(r)),
          (s.HEAPU32 = A = new Uint32Array(r)),
          (s.HEAPF32 = M = new Float32Array(r)),
          (s.HEAPF64 = P = new Float64Array(r))
      }
      var j = [],
        x = [],
        R = [],
        O = !1
      var $ = 0,
        z = null,
        N = null
      function W(r) {
        $++, s.monitorRunDependencies?.($)
      }
      function I(r) {
        if (($--, s.monitorRunDependencies?.($), 0 == $ && (null !== z && (clearInterval(z), (z = null)), N))) {
          var e = N
          ;(N = null), e()
        }
      }
      function L(r) {
        s.onAbort?.(r), _((r = "Aborted(" + r + ")")), (T = !0), 1, (r += ". Build with -sASSERTIONS for more info."), O && We()
        var e = new WebAssembly.RuntimeError(r)
        throw (n(e), e)
      }
      var B,
        U,
        H,
        Y,
        q = r => r.startsWith("data:application/octet-stream;base64,"),
        V = r => r.startsWith("file://")
      function X(r) {
        if (r == B && w) return new Uint8Array(w)
        if (i) return i(r)
        throw "both async and sync fetching of the wasm failed"
      }
      function G(r, e, t) {
        return (function (r) {
          if (!w && (l || d)) {
            if ("function" == typeof fetch && !V(r))
              return fetch(r, { credentials: "same-origin" })
                .then(e => {
                  if (!e.ok) throw `failed to load wasm binary file at '${r}'`
                  return e.arrayBuffer()
                })
                .catch(() => X(r))
            if (a)
              return new Promise((e, t) => {
                a(r, r => e(new Uint8Array(r)), t)
              })
          }
          return Promise.resolve().then(() => X(r))
        })(r)
          .then(r => WebAssembly.instantiate(r, e))
          .then(t, r => {
            _(`failed to asynchronously prepare wasm: ${r}`), L(r)
          })
      }
      function K(r) {
        ;(this.name = "ExitStatus"), (this.message = `Program terminated with exit(${r})`), (this.status = r)
      }
      q((B = "occt-import-js.wasm")) || ((U = B), (B = s.locateFile ? s.locateFile(U, p) : p + U))
      var Z = r => {
          for (; r.length > 0; ) r.shift()(s)
        },
        J = s.noExitRuntime || !0,
        Q = {
          isAbs: r => "/" === r.charAt(0),
          splitPath: r => /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(r).slice(1),
          normalizeArray: (r, e) => {
            for (var t = 0, n = r.length - 1; n >= 0; n--) {
              var o = r[n]
              "." === o ? r.splice(n, 1) : ".." === o ? (r.splice(n, 1), t++) : t && (r.splice(n, 1), t--)
            }
            if (e) for (; t; t--) r.unshift("..")
            return r
          },
          normalize: r => {
            var e = Q.isAbs(r),
              t = "/" === r.substr(-1)
            return (
              (r = Q.normalizeArray(
                r.split("/").filter(r => !!r),
                !e,
              ).join("/")) ||
                e ||
                (r = "."),
              r && t && (r += "/"),
              (e ? "/" : "") + r
            )
          },
          dirname: r => {
            var e = Q.splitPath(r),
              t = e[0],
              n = e[1]
            return t || n ? (n && (n = n.substr(0, n.length - 1)), t + n) : "."
          },
          basename: r => {
            if ("/" === r) return "/"
            var e = (r = (r = Q.normalize(r)).replace(/\/$/, "")).lastIndexOf("/")
            return -1 === e ? r : r.substr(e + 1)
          },
          join: (...r) => Q.normalize(r.join("/")),
          join2: (r, e) => Q.normalize(r + "/" + e),
        },
        rr = r =>
          (rr = (() => {
            if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) return r => crypto.getRandomValues(r)
            if (c)
              try {
                var r = require("crypto")
                if (r.randomFillSync) return e => r.randomFillSync(e)
                var e = r.randomBytes
                return r => (r.set(e(r.byteLength)), r)
              } catch (r) {}
            L("initRandomDevice")
          })())(r),
        er = {
          resolve: (...r) => {
            for (var e = "", t = !1, n = r.length - 1; n >= -1 && !t; n--) {
              var o = n >= 0 ? r[n] : mr.cwd()
              if ("string" != typeof o) throw new TypeError("Arguments to path.resolve must be strings")
              if (!o) return ""
              ;(e = o + "/" + e), (t = Q.isAbs(o))
            }
            return (
              (t ? "/" : "") +
                (e = Q.normalizeArray(
                  e.split("/").filter(r => !!r),
                  !t,
                ).join("/")) || "."
            )
          },
          relative: (r, e) => {
            function t(r) {
              for (var e = 0; e < r.length && "" === r[e]; e++);
              for (var t = r.length - 1; t >= 0 && "" === r[t]; t--);
              return e > t ? [] : r.slice(e, t - e + 1)
            }
            ;(r = er.resolve(r).substr(1)), (e = er.resolve(e).substr(1))
            for (var n = t(r.split("/")), o = t(e.split("/")), a = Math.min(n.length, o.length), i = a, s = 0; s < a; s++)
              if (n[s] !== o[s]) {
                i = s
                break
              }
            var u = []
            for (s = i; s < n.length; s++) u.push("..")
            return (u = u.concat(o.slice(i))).join("/")
          },
        },
        tr = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
        nr = (r, e, t) => {
          for (var n = e + t, o = e; r[o] && !(o >= n); ) ++o
          if (o - e > 16 && r.buffer && tr) return tr.decode(r.subarray(e, o))
          for (var a = ""; e < o; ) {
            var i = r[e++]
            if (128 & i) {
              var s = 63 & r[e++]
              if (192 != (224 & i)) {
                var u = 63 & r[e++]
                if (
                  (i =
                    224 == (240 & i) ? ((15 & i) << 12) | (s << 6) | u : ((7 & i) << 18) | (s << 12) | (u << 6) | (63 & r[e++])) <
                  65536
                )
                  a += String.fromCharCode(i)
                else {
                  var l = i - 65536
                  a += String.fromCharCode(55296 | (l >> 10), 56320 | (1023 & l))
                }
              } else a += String.fromCharCode(((31 & i) << 6) | s)
            } else a += String.fromCharCode(i)
          }
          return a
        },
        or = [],
        ar = r => {
          for (var e = 0, t = 0; t < r.length; ++t) {
            var n = r.charCodeAt(t)
            n <= 127 ? e++ : n <= 2047 ? (e += 2) : n >= 55296 && n <= 57343 ? ((e += 4), ++t) : (e += 3)
          }
          return e
        },
        ir = (r, e, t, n) => {
          if (!(n > 0)) return 0
          for (var o = t, a = t + n - 1, i = 0; i < r.length; ++i) {
            var s = r.charCodeAt(i)
            if (s >= 55296 && s <= 57343) s = (65536 + ((1023 & s) << 10)) | (1023 & r.charCodeAt(++i))
            if (s <= 127) {
              if (t >= a) break
              e[t++] = s
            } else if (s <= 2047) {
              if (t + 1 >= a) break
              ;(e[t++] = 192 | (s >> 6)), (e[t++] = 128 | (63 & s))
            } else if (s <= 65535) {
              if (t + 2 >= a) break
              ;(e[t++] = 224 | (s >> 12)), (e[t++] = 128 | ((s >> 6) & 63)), (e[t++] = 128 | (63 & s))
            } else {
              if (t + 3 >= a) break
              ;(e[t++] = 240 | (s >> 18)),
                (e[t++] = 128 | ((s >> 12) & 63)),
                (e[t++] = 128 | ((s >> 6) & 63)),
                (e[t++] = 128 | (63 & s))
            }
          }
          return (e[t] = 0), t - o
        }
      function sr(r, e, t) {
        var n = t > 0 ? t : ar(r) + 1,
          o = new Array(n),
          a = ir(r, o, 0, o.length)
        return e && (o.length = a), o
      }
      var ur = {
          ttys: [],
          init() {},
          shutdown() {},
          register(r, e) {
            ;(ur.ttys[r] = { input: [], output: [], ops: e }), mr.registerDevice(r, ur.stream_ops)
          },
          stream_ops: {
            open(r) {
              var e = ur.ttys[r.node.rdev]
              if (!e) throw new mr.ErrnoError(43)
              ;(r.tty = e), (r.seekable = !1)
            },
            close(r) {
              r.tty.ops.fsync(r.tty)
            },
            fsync(r) {
              r.tty.ops.fsync(r.tty)
            },
            read(r, e, t, n, o) {
              if (!r.tty || !r.tty.ops.get_char) throw new mr.ErrnoError(60)
              for (var a = 0, i = 0; i < n; i++) {
                var s
                try {
                  s = r.tty.ops.get_char(r.tty)
                } catch (r) {
                  throw new mr.ErrnoError(29)
                }
                if (void 0 === s && 0 === a) throw new mr.ErrnoError(6)
                if (null == s) break
                a++, (e[t + i] = s)
              }
              return a && (r.node.timestamp = Date.now()), a
            },
            write(r, e, t, n, o) {
              if (!r.tty || !r.tty.ops.put_char) throw new mr.ErrnoError(60)
              try {
                for (var a = 0; a < n; a++) r.tty.ops.put_char(r.tty, e[t + a])
              } catch (r) {
                throw new mr.ErrnoError(29)
              }
              return n && (r.node.timestamp = Date.now()), a
            },
          },
          default_tty_ops: {
            get_char: r =>
              (() => {
                if (!or.length) {
                  var r = null
                  if (c) {
                    var e = Buffer.alloc(256),
                      t = 0,
                      n = process.stdin.fd
                    try {
                      t = v.readSync(n, e)
                    } catch (r) {
                      if (!r.toString().includes("EOF")) throw r
                      t = 0
                    }
                    r = t > 0 ? e.slice(0, t).toString("utf-8") : null
                  } else
                    "undefined" != typeof window && "function" == typeof window.prompt
                      ? null !== (r = window.prompt("Input: ")) && (r += "\n")
                      : "function" == typeof readline && null !== (r = readline()) && (r += "\n")
                  if (!r) return null
                  or = sr(r, !0)
                }
                return or.shift()
              })(),
            put_char(r, e) {
              null === e || 10 === e ? (E(nr(r.output, 0)), (r.output = [])) : 0 != e && r.output.push(e)
            },
            fsync(r) {
              r.output && r.output.length > 0 && (E(nr(r.output, 0)), (r.output = []))
            },
            ioctl_tcgets: r => ({
              c_iflag: 25856,
              c_oflag: 5,
              c_cflag: 191,
              c_lflag: 35387,
              c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }),
            ioctl_tcsets: (r, e, t) => 0,
            ioctl_tiocgwinsz: r => [24, 80],
          },
          default_tty1_ops: {
            put_char(r, e) {
              null === e || 10 === e ? (_(nr(r.output, 0)), (r.output = [])) : 0 != e && r.output.push(e)
            },
            fsync(r) {
              r.output && r.output.length > 0 && (_(nr(r.output, 0)), (r.output = []))
            },
          },
        },
        lr = r => {
          r = ((r, e) => Math.ceil(r / e) * e)(r, 65536)
          var e = Ne(65536, r)
          return e ? ((r, e) => (k.fill(0, r, r + e), r))(e, r) : 0
        },
        dr = {
          ops_table: null,
          mount: r => dr.createNode(null, "/", 16895, 0),
          createNode(r, e, t, n) {
            if (mr.isBlkdev(t) || mr.isFIFO(t)) throw new mr.ErrnoError(63)
            dr.ops_table ||= {
              dir: {
                node: {
                  getattr: dr.node_ops.getattr,
                  setattr: dr.node_ops.setattr,
                  lookup: dr.node_ops.lookup,
                  mknod: dr.node_ops.mknod,
                  rename: dr.node_ops.rename,
                  unlink: dr.node_ops.unlink,
                  rmdir: dr.node_ops.rmdir,
                  readdir: dr.node_ops.readdir,
                  symlink: dr.node_ops.symlink,
                },
                stream: { llseek: dr.stream_ops.llseek },
              },
              file: {
                node: { getattr: dr.node_ops.getattr, setattr: dr.node_ops.setattr },
                stream: {
                  llseek: dr.stream_ops.llseek,
                  read: dr.stream_ops.read,
                  write: dr.stream_ops.write,
                  allocate: dr.stream_ops.allocate,
                  mmap: dr.stream_ops.mmap,
                  msync: dr.stream_ops.msync,
                },
              },
              link: {
                node: { getattr: dr.node_ops.getattr, setattr: dr.node_ops.setattr, readlink: dr.node_ops.readlink },
                stream: {},
              },
              chrdev: { node: { getattr: dr.node_ops.getattr, setattr: dr.node_ops.setattr }, stream: mr.chrdev_stream_ops },
            }
            var o = mr.createNode(r, e, t, n)
            return (
              mr.isDir(o.mode)
                ? ((o.node_ops = dr.ops_table.dir.node), (o.stream_ops = dr.ops_table.dir.stream), (o.contents = {}))
                : mr.isFile(o.mode)
                  ? ((o.node_ops = dr.ops_table.file.node),
                    (o.stream_ops = dr.ops_table.file.stream),
                    (o.usedBytes = 0),
                    (o.contents = null))
                  : mr.isLink(o.mode)
                    ? ((o.node_ops = dr.ops_table.link.node), (o.stream_ops = dr.ops_table.link.stream))
                    : mr.isChrdev(o.mode) &&
                      ((o.node_ops = dr.ops_table.chrdev.node), (o.stream_ops = dr.ops_table.chrdev.stream)),
              (o.timestamp = Date.now()),
              r && ((r.contents[e] = o), (r.timestamp = o.timestamp)),
              o
            )
          },
          getFileDataAsTypedArray: r =>
            r.contents
              ? r.contents.subarray
                ? r.contents.subarray(0, r.usedBytes)
                : new Uint8Array(r.contents)
              : new Uint8Array(0),
          expandFileStorage(r, e) {
            var t = r.contents ? r.contents.length : 0
            if (!(t >= e)) {
              ;(e = Math.max(e, (t * (t < 1048576 ? 2 : 1.125)) >>> 0)), 0 != t && (e = Math.max(e, 256))
              var n = r.contents
              ;(r.contents = new Uint8Array(e)), r.usedBytes > 0 && r.contents.set(n.subarray(0, r.usedBytes), 0)
            }
          },
          resizeFileStorage(r, e) {
            if (r.usedBytes != e)
              if (0 == e) (r.contents = null), (r.usedBytes = 0)
              else {
                var t = r.contents
                ;(r.contents = new Uint8Array(e)), t && r.contents.set(t.subarray(0, Math.min(e, r.usedBytes))), (r.usedBytes = e)
              }
          },
          node_ops: {
            getattr(r) {
              var e = {}
              return (
                (e.dev = mr.isChrdev(r.mode) ? r.id : 1),
                (e.ino = r.id),
                (e.mode = r.mode),
                (e.nlink = 1),
                (e.uid = 0),
                (e.gid = 0),
                (e.rdev = r.rdev),
                mr.isDir(r.mode)
                  ? (e.size = 4096)
                  : mr.isFile(r.mode)
                    ? (e.size = r.usedBytes)
                    : mr.isLink(r.mode)
                      ? (e.size = r.link.length)
                      : (e.size = 0),
                (e.atime = new Date(r.timestamp)),
                (e.mtime = new Date(r.timestamp)),
                (e.ctime = new Date(r.timestamp)),
                (e.blksize = 4096),
                (e.blocks = Math.ceil(e.size / e.blksize)),
                e
              )
            },
            setattr(r, e) {
              void 0 !== e.mode && (r.mode = e.mode),
                void 0 !== e.timestamp && (r.timestamp = e.timestamp),
                void 0 !== e.size && dr.resizeFileStorage(r, e.size)
            },
            lookup(r, e) {
              throw mr.genericErrors[44]
            },
            mknod: (r, e, t, n) => dr.createNode(r, e, t, n),
            rename(r, e, t) {
              if (mr.isDir(r.mode)) {
                var n
                try {
                  n = mr.lookupNode(e, t)
                } catch (r) {}
                if (n) for (var o in n.contents) throw new mr.ErrnoError(55)
              }
              delete r.parent.contents[r.name],
                (r.parent.timestamp = Date.now()),
                (r.name = t),
                (e.contents[t] = r),
                (e.timestamp = r.parent.timestamp),
                (r.parent = e)
            },
            unlink(r, e) {
              delete r.contents[e], (r.timestamp = Date.now())
            },
            rmdir(r, e) {
              var t = mr.lookupNode(r, e)
              for (var n in t.contents) throw new mr.ErrnoError(55)
              delete r.contents[e], (r.timestamp = Date.now())
            },
            readdir(r) {
              var e = [".", ".."]
              for (var t of Object.keys(r.contents)) e.push(t)
              return e
            },
            symlink(r, e, t) {
              var n = dr.createNode(r, e, 41471, 0)
              return (n.link = t), n
            },
            readlink(r) {
              if (!mr.isLink(r.mode)) throw new mr.ErrnoError(28)
              return r.link
            },
          },
          stream_ops: {
            read(r, e, t, n, o) {
              var a = r.node.contents
              if (o >= r.node.usedBytes) return 0
              var i = Math.min(r.node.usedBytes - o, n)
              if (i > 8 && a.subarray) e.set(a.subarray(o, o + i), t)
              else for (var s = 0; s < i; s++) e[t + s] = a[o + s]
              return i
            },
            write(r, e, t, n, o, a) {
              if ((e.buffer === b.buffer && (a = !1), !n)) return 0
              var i = r.node
              if (((i.timestamp = Date.now()), e.subarray && (!i.contents || i.contents.subarray))) {
                if (a) return (i.contents = e.subarray(t, t + n)), (i.usedBytes = n), n
                if (0 === i.usedBytes && 0 === o) return (i.contents = e.slice(t, t + n)), (i.usedBytes = n), n
                if (o + n <= i.usedBytes) return i.contents.set(e.subarray(t, t + n), o), n
              }
              if ((dr.expandFileStorage(i, o + n), i.contents.subarray && e.subarray)) i.contents.set(e.subarray(t, t + n), o)
              else for (var s = 0; s < n; s++) i.contents[o + s] = e[t + s]
              return (i.usedBytes = Math.max(i.usedBytes, o + n)), n
            },
            llseek(r, e, t) {
              var n = e
              if ((1 === t ? (n += r.position) : 2 === t && mr.isFile(r.node.mode) && (n += r.node.usedBytes), n < 0))
                throw new mr.ErrnoError(28)
              return n
            },
            allocate(r, e, t) {
              dr.expandFileStorage(r.node, e + t), (r.node.usedBytes = Math.max(r.node.usedBytes, e + t))
            },
            mmap(r, e, t, n, o) {
              if (!mr.isFile(r.node.mode)) throw new mr.ErrnoError(43)
              var a,
                i,
                s = r.node.contents
              if (2 & o || s.buffer !== b.buffer) {
                if (
                  ((t > 0 || t + e < s.length) &&
                    (s = s.subarray ? s.subarray(t, t + e) : Array.prototype.slice.call(s, t, t + e)),
                  (i = !0),
                  !(a = lr(e)))
                )
                  throw new mr.ErrnoError(48)
                b.set(s, a)
              } else (i = !1), (a = s.byteOffset)
              return { ptr: a, allocated: i }
            },
            msync: (r, e, t, n, o) => (dr.stream_ops.write(r, e, 0, n, t, !1), 0),
          },
        },
        cr = s.preloadPlugins || [],
        fr = (r, e) => {
          var t = 0
          return r && (t |= 365), e && (t |= 146), t
        },
        mr = {
          root: null,
          mounts: [],
          devices: {},
          streams: [],
          nextInode: 1,
          nameTable: null,
          currentPath: "/",
          initialized: !1,
          ignorePermissions: !0,
          ErrnoError: class {
            constructor(r) {
              ;(this.name = "ErrnoError"), (this.errno = r)
            }
          },
          genericErrors: {},
          filesystems: null,
          syncFSRequests: 0,
          FSStream: class {
            constructor() {
              this.shared = {}
            }
            get object() {
              return this.node
            }
            set object(r) {
              this.node = r
            }
            get isRead() {
              return 1 != (2097155 & this.flags)
            }
            get isWrite() {
              return 0 != (2097155 & this.flags)
            }
            get isAppend() {
              return 1024 & this.flags
            }
            get flags() {
              return this.shared.flags
            }
            set flags(r) {
              this.shared.flags = r
            }
            get position() {
              return this.shared.position
            }
            set position(r) {
              this.shared.position = r
            }
          },
          FSNode: class {
            constructor(r, e, t, n) {
              r || (r = this),
                (this.parent = r),
                (this.mount = r.mount),
                (this.mounted = null),
                (this.id = mr.nextInode++),
                (this.name = e),
                (this.mode = t),
                (this.node_ops = {}),
                (this.stream_ops = {}),
                (this.rdev = n),
                (this.readMode = 365),
                (this.writeMode = 146)
            }
            get read() {
              return (this.mode & this.readMode) === this.readMode
            }
            set read(r) {
              r ? (this.mode |= this.readMode) : (this.mode &= ~this.readMode)
            }
            get write() {
              return (this.mode & this.writeMode) === this.writeMode
            }
            set write(r) {
              r ? (this.mode |= this.writeMode) : (this.mode &= ~this.writeMode)
            }
            get isFolder() {
              return mr.isDir(this.mode)
            }
            get isDevice() {
              return mr.isChrdev(this.mode)
            }
          },
          lookupPath(r, e = {}) {
            if (!(r = er.resolve(r))) return { path: "", node: null }
            if ((e = Object.assign({ follow_mount: !0, recurse_count: 0 }, e)).recurse_count > 8) throw new mr.ErrnoError(32)
            for (var t = r.split("/").filter(r => !!r), n = mr.root, o = "/", a = 0; a < t.length; a++) {
              var i = a === t.length - 1
              if (i && e.parent) break
              if (
                ((n = mr.lookupNode(n, t[a])),
                (o = Q.join2(o, t[a])),
                mr.isMountpoint(n) && (!i || (i && e.follow_mount)) && (n = n.mounted.root),
                !i || e.follow)
              )
                for (var s = 0; mr.isLink(n.mode); ) {
                  var u = mr.readlink(o)
                  if (
                    ((o = er.resolve(Q.dirname(o), u)),
                    (n = mr.lookupPath(o, { recurse_count: e.recurse_count + 1 }).node),
                    s++ > 40)
                  )
                    throw new mr.ErrnoError(32)
                }
            }
            return { path: o, node: n }
          },
          getPath(r) {
            for (var e; ; ) {
              if (mr.isRoot(r)) {
                var t = r.mount.mountpoint
                return e ? ("/" !== t[t.length - 1] ? `${t}/${e}` : t + e) : t
              }
              ;(e = e ? `${r.name}/${e}` : r.name), (r = r.parent)
            }
          },
          hashName(r, e) {
            for (var t = 0, n = 0; n < e.length; n++) t = ((t << 5) - t + e.charCodeAt(n)) | 0
            return ((r + t) >>> 0) % mr.nameTable.length
          },
          hashAddNode(r) {
            var e = mr.hashName(r.parent.id, r.name)
            ;(r.name_next = mr.nameTable[e]), (mr.nameTable[e] = r)
          },
          hashRemoveNode(r) {
            var e = mr.hashName(r.parent.id, r.name)
            if (mr.nameTable[e] === r) mr.nameTable[e] = r.name_next
            else
              for (var t = mr.nameTable[e]; t; ) {
                if (t.name_next === r) {
                  t.name_next = r.name_next
                  break
                }
                t = t.name_next
              }
          },
          lookupNode(r, e) {
            var t = mr.mayLookup(r)
            if (t) throw new mr.ErrnoError(t)
            for (var n = mr.hashName(r.id, e), o = mr.nameTable[n]; o; o = o.name_next) {
              var a = o.name
              if (o.parent.id === r.id && a === e) return o
            }
            return mr.lookup(r, e)
          },
          createNode(r, e, t, n) {
            var o = new mr.FSNode(r, e, t, n)
            return mr.hashAddNode(o), o
          },
          destroyNode(r) {
            mr.hashRemoveNode(r)
          },
          isRoot: r => r === r.parent,
          isMountpoint: r => !!r.mounted,
          isFile: r => 32768 == (61440 & r),
          isDir: r => 16384 == (61440 & r),
          isLink: r => 40960 == (61440 & r),
          isChrdev: r => 8192 == (61440 & r),
          isBlkdev: r => 24576 == (61440 & r),
          isFIFO: r => 4096 == (61440 & r),
          isSocket: r => 49152 == (49152 & r),
          flagsToPermissionString(r) {
            var e = ["r", "w", "rw"][3 & r]
            return 512 & r && (e += "w"), e
          },
          nodePermissions: (r, e) =>
            mr.ignorePermissions ||
            ((!e.includes("r") || 292 & r.mode) && (!e.includes("w") || 146 & r.mode) && (!e.includes("x") || 73 & r.mode))
              ? 0
              : 2,
          mayLookup(r) {
            if (!mr.isDir(r.mode)) return 54
            var e = mr.nodePermissions(r, "x")
            return e || (r.node_ops.lookup ? 0 : 2)
          },
          mayCreate(r, e) {
            try {
              mr.lookupNode(r, e)
              return 20
            } catch (r) {}
            return mr.nodePermissions(r, "wx")
          },
          mayDelete(r, e, t) {
            var n
            try {
              n = mr.lookupNode(r, e)
            } catch (r) {
              return r.errno
            }
            var o = mr.nodePermissions(r, "wx")
            if (o) return o
            if (t) {
              if (!mr.isDir(n.mode)) return 54
              if (mr.isRoot(n) || mr.getPath(n) === mr.cwd()) return 10
            } else if (mr.isDir(n.mode)) return 31
            return 0
          },
          mayOpen: (r, e) =>
            r
              ? mr.isLink(r.mode)
                ? 32
                : mr.isDir(r.mode) && ("r" !== mr.flagsToPermissionString(e) || 512 & e)
                  ? 31
                  : mr.nodePermissions(r, mr.flagsToPermissionString(e))
              : 44,
          MAX_OPEN_FDS: 4096,
          nextfd() {
            for (var r = 0; r <= mr.MAX_OPEN_FDS; r++) if (!mr.streams[r]) return r
            throw new mr.ErrnoError(33)
          },
          getStreamChecked(r) {
            var e = mr.getStream(r)
            if (!e) throw new mr.ErrnoError(8)
            return e
          },
          getStream: r => mr.streams[r],
          createStream: (r, e = -1) => (
            (r = Object.assign(new mr.FSStream(), r)), -1 == e && (e = mr.nextfd()), (r.fd = e), (mr.streams[e] = r), r
          ),
          closeStream(r) {
            mr.streams[r] = null
          },
          dupStream(r, e = -1) {
            var t = mr.createStream(r, e)
            return t.stream_ops?.dup?.(t), t
          },
          chrdev_stream_ops: {
            open(r) {
              var e = mr.getDevice(r.node.rdev)
              ;(r.stream_ops = e.stream_ops), r.stream_ops.open?.(r)
            },
            llseek() {
              throw new mr.ErrnoError(70)
            },
          },
          major: r => r >> 8,
          minor: r => 255 & r,
          makedev: (r, e) => (r << 8) | e,
          registerDevice(r, e) {
            mr.devices[r] = { stream_ops: e }
          },
          getDevice: r => mr.devices[r],
          getMounts(r) {
            for (var e = [], t = [r]; t.length; ) {
              var n = t.pop()
              e.push(n), t.push(...n.mounts)
            }
            return e
          },
          syncfs(r, e) {
            "function" == typeof r && ((e = r), (r = !1)),
              mr.syncFSRequests++,
              mr.syncFSRequests > 1 &&
                _(`warning: ${mr.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`)
            var t = mr.getMounts(mr.root.mount),
              n = 0
            function o(r) {
              return mr.syncFSRequests--, e(r)
            }
            function a(r) {
              if (r) return a.errored ? void 0 : ((a.errored = !0), o(r))
              ++n >= t.length && o(null)
            }
            t.forEach(e => {
              if (!e.type.syncfs) return a(null)
              e.type.syncfs(e, r, a)
            })
          },
          mount(r, e, t) {
            var n,
              o = "/" === t,
              a = !t
            if (o && mr.root) throw new mr.ErrnoError(10)
            if (!o && !a) {
              var i = mr.lookupPath(t, { follow_mount: !1 })
              if (((t = i.path), (n = i.node), mr.isMountpoint(n))) throw new mr.ErrnoError(10)
              if (!mr.isDir(n.mode)) throw new mr.ErrnoError(54)
            }
            var s = { type: r, opts: e, mountpoint: t, mounts: [] },
              u = r.mount(s)
            return (u.mount = s), (s.root = u), o ? (mr.root = u) : n && ((n.mounted = s), n.mount && n.mount.mounts.push(s)), u
          },
          unmount(r) {
            var e = mr.lookupPath(r, { follow_mount: !1 })
            if (!mr.isMountpoint(e.node)) throw new mr.ErrnoError(28)
            var t = e.node,
              n = t.mounted,
              o = mr.getMounts(n)
            Object.keys(mr.nameTable).forEach(r => {
              for (var e = mr.nameTable[r]; e; ) {
                var t = e.name_next
                o.includes(e.mount) && mr.destroyNode(e), (e = t)
              }
            }),
              (t.mounted = null)
            var a = t.mount.mounts.indexOf(n)
            t.mount.mounts.splice(a, 1)
          },
          lookup: (r, e) => r.node_ops.lookup(r, e),
          mknod(r, e, t) {
            var n = mr.lookupPath(r, { parent: !0 }).node,
              o = Q.basename(r)
            if (!o || "." === o || ".." === o) throw new mr.ErrnoError(28)
            var a = mr.mayCreate(n, o)
            if (a) throw new mr.ErrnoError(a)
            if (!n.node_ops.mknod) throw new mr.ErrnoError(63)
            return n.node_ops.mknod(n, o, e, t)
          },
          create: (r, e) => ((e = void 0 !== e ? e : 438), (e &= 4095), (e |= 32768), mr.mknod(r, e, 0)),
          mkdir: (r, e) => ((e = void 0 !== e ? e : 511), (e &= 1023), (e |= 16384), mr.mknod(r, e, 0)),
          mkdirTree(r, e) {
            for (var t = r.split("/"), n = "", o = 0; o < t.length; ++o)
              if (t[o]) {
                n += "/" + t[o]
                try {
                  mr.mkdir(n, e)
                } catch (r) {
                  if (20 != r.errno) throw r
                }
              }
          },
          mkdev: (r, e, t) => (void 0 === t && ((t = e), (e = 438)), (e |= 8192), mr.mknod(r, e, t)),
          symlink(r, e) {
            if (!er.resolve(r)) throw new mr.ErrnoError(44)
            var t = mr.lookupPath(e, { parent: !0 }).node
            if (!t) throw new mr.ErrnoError(44)
            var n = Q.basename(e),
              o = mr.mayCreate(t, n)
            if (o) throw new mr.ErrnoError(o)
            if (!t.node_ops.symlink) throw new mr.ErrnoError(63)
            return t.node_ops.symlink(t, n, r)
          },
          rename(r, e) {
            var t,
              n,
              o = Q.dirname(r),
              a = Q.dirname(e),
              i = Q.basename(r),
              s = Q.basename(e)
            if (((t = mr.lookupPath(r, { parent: !0 }).node), (n = mr.lookupPath(e, { parent: !0 }).node), !t || !n))
              throw new mr.ErrnoError(44)
            if (t.mount !== n.mount) throw new mr.ErrnoError(75)
            var u,
              l = mr.lookupNode(t, i),
              d = er.relative(r, a)
            if ("." !== d.charAt(0)) throw new mr.ErrnoError(28)
            if ("." !== (d = er.relative(e, o)).charAt(0)) throw new mr.ErrnoError(55)
            try {
              u = mr.lookupNode(n, s)
            } catch (r) {}
            if (l !== u) {
              var c = mr.isDir(l.mode),
                f = mr.mayDelete(t, i, c)
              if (f) throw new mr.ErrnoError(f)
              if ((f = u ? mr.mayDelete(n, s, c) : mr.mayCreate(n, s))) throw new mr.ErrnoError(f)
              if (!t.node_ops.rename) throw new mr.ErrnoError(63)
              if (mr.isMountpoint(l) || (u && mr.isMountpoint(u))) throw new mr.ErrnoError(10)
              if (n !== t && (f = mr.nodePermissions(t, "w"))) throw new mr.ErrnoError(f)
              mr.hashRemoveNode(l)
              try {
                t.node_ops.rename(l, n, s)
              } catch (r) {
                throw r
              } finally {
                mr.hashAddNode(l)
              }
            }
          },
          rmdir(r) {
            var e = mr.lookupPath(r, { parent: !0 }).node,
              t = Q.basename(r),
              n = mr.lookupNode(e, t),
              o = mr.mayDelete(e, t, !0)
            if (o) throw new mr.ErrnoError(o)
            if (!e.node_ops.rmdir) throw new mr.ErrnoError(63)
            if (mr.isMountpoint(n)) throw new mr.ErrnoError(10)
            e.node_ops.rmdir(e, t), mr.destroyNode(n)
          },
          readdir(r) {
            var e = mr.lookupPath(r, { follow: !0 }).node
            if (!e.node_ops.readdir) throw new mr.ErrnoError(54)
            return e.node_ops.readdir(e)
          },
          unlink(r) {
            var e = mr.lookupPath(r, { parent: !0 }).node
            if (!e) throw new mr.ErrnoError(44)
            var t = Q.basename(r),
              n = mr.lookupNode(e, t),
              o = mr.mayDelete(e, t, !1)
            if (o) throw new mr.ErrnoError(o)
            if (!e.node_ops.unlink) throw new mr.ErrnoError(63)
            if (mr.isMountpoint(n)) throw new mr.ErrnoError(10)
            e.node_ops.unlink(e, t), mr.destroyNode(n)
          },
          readlink(r) {
            var e = mr.lookupPath(r).node
            if (!e) throw new mr.ErrnoError(44)
            if (!e.node_ops.readlink) throw new mr.ErrnoError(28)
            return er.resolve(mr.getPath(e.parent), e.node_ops.readlink(e))
          },
          stat(r, e) {
            var t = mr.lookupPath(r, { follow: !e }).node
            if (!t) throw new mr.ErrnoError(44)
            if (!t.node_ops.getattr) throw new mr.ErrnoError(63)
            return t.node_ops.getattr(t)
          },
          lstat: r => mr.stat(r, !0),
          chmod(r, e, t) {
            var n
            "string" == typeof r ? (n = mr.lookupPath(r, { follow: !t }).node) : (n = r)
            if (!n.node_ops.setattr) throw new mr.ErrnoError(63)
            n.node_ops.setattr(n, { mode: (4095 & e) | (-4096 & n.mode), timestamp: Date.now() })
          },
          lchmod(r, e) {
            mr.chmod(r, e, !0)
          },
          fchmod(r, e) {
            var t = mr.getStreamChecked(r)
            mr.chmod(t.node, e)
          },
          chown(r, e, t, n) {
            var o
            "string" == typeof r ? (o = mr.lookupPath(r, { follow: !n }).node) : (o = r)
            if (!o.node_ops.setattr) throw new mr.ErrnoError(63)
            o.node_ops.setattr(o, { timestamp: Date.now() })
          },
          lchown(r, e, t) {
            mr.chown(r, e, t, !0)
          },
          fchown(r, e, t) {
            var n = mr.getStreamChecked(r)
            mr.chown(n.node, e, t)
          },
          truncate(r, e) {
            if (e < 0) throw new mr.ErrnoError(28)
            var t
            "string" == typeof r ? (t = mr.lookupPath(r, { follow: !0 }).node) : (t = r)
            if (!t.node_ops.setattr) throw new mr.ErrnoError(63)
            if (mr.isDir(t.mode)) throw new mr.ErrnoError(31)
            if (!mr.isFile(t.mode)) throw new mr.ErrnoError(28)
            var n = mr.nodePermissions(t, "w")
            if (n) throw new mr.ErrnoError(n)
            t.node_ops.setattr(t, { size: e, timestamp: Date.now() })
          },
          ftruncate(r, e) {
            var t = mr.getStreamChecked(r)
            if (0 == (2097155 & t.flags)) throw new mr.ErrnoError(28)
            mr.truncate(t.node, e)
          },
          utime(r, e, t) {
            var n = mr.lookupPath(r, { follow: !0 }).node
            n.node_ops.setattr(n, { timestamp: Math.max(e, t) })
          },
          open(r, e, t) {
            if ("" === r) throw new mr.ErrnoError(44)
            var n
            if (
              ((t = void 0 === t ? 438 : t),
              (t =
                64 &
                (e =
                  "string" == typeof e
                    ? (r => {
                        var e = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[r]
                        if (void 0 === e) throw new Error(`Unknown file open mode: ${r}`)
                        return e
                      })(e)
                    : e)
                  ? (4095 & t) | 32768
                  : 0),
              "object" == typeof r)
            )
              n = r
            else {
              r = Q.normalize(r)
              try {
                n = mr.lookupPath(r, { follow: !(131072 & e) }).node
              } catch (r) {}
            }
            var o = !1
            if (64 & e)
              if (n) {
                if (128 & e) throw new mr.ErrnoError(20)
              } else (n = mr.mknod(r, t, 0)), (o = !0)
            if (!n) throw new mr.ErrnoError(44)
            if ((mr.isChrdev(n.mode) && (e &= -513), 65536 & e && !mr.isDir(n.mode))) throw new mr.ErrnoError(54)
            if (!o) {
              var a = mr.mayOpen(n, e)
              if (a) throw new mr.ErrnoError(a)
            }
            512 & e && !o && mr.truncate(n, 0), (e &= -131713)
            var i = mr.createStream({
              node: n,
              path: mr.getPath(n),
              flags: e,
              seekable: !0,
              position: 0,
              stream_ops: n.stream_ops,
              ungotten: [],
              error: !1,
            })
            return (
              i.stream_ops.open && i.stream_ops.open(i),
              !s.logReadFiles || 1 & e || (mr.readFiles || (mr.readFiles = {}), r in mr.readFiles || (mr.readFiles[r] = 1)),
              i
            )
          },
          close(r) {
            if (mr.isClosed(r)) throw new mr.ErrnoError(8)
            r.getdents && (r.getdents = null)
            try {
              r.stream_ops.close && r.stream_ops.close(r)
            } catch (r) {
              throw r
            } finally {
              mr.closeStream(r.fd)
            }
            r.fd = null
          },
          isClosed: r => null === r.fd,
          llseek(r, e, t) {
            if (mr.isClosed(r)) throw new mr.ErrnoError(8)
            if (!r.seekable || !r.stream_ops.llseek) throw new mr.ErrnoError(70)
            if (0 != t && 1 != t && 2 != t) throw new mr.ErrnoError(28)
            return (r.position = r.stream_ops.llseek(r, e, t)), (r.ungotten = []), r.position
          },
          read(r, e, t, n, o) {
            if (n < 0 || o < 0) throw new mr.ErrnoError(28)
            if (mr.isClosed(r)) throw new mr.ErrnoError(8)
            if (1 == (2097155 & r.flags)) throw new mr.ErrnoError(8)
            if (mr.isDir(r.node.mode)) throw new mr.ErrnoError(31)
            if (!r.stream_ops.read) throw new mr.ErrnoError(28)
            var a = void 0 !== o
            if (a) {
              if (!r.seekable) throw new mr.ErrnoError(70)
            } else o = r.position
            var i = r.stream_ops.read(r, e, t, n, o)
            return a || (r.position += i), i
          },
          write(r, e, t, n, o, a) {
            if (n < 0 || o < 0) throw new mr.ErrnoError(28)
            if (mr.isClosed(r)) throw new mr.ErrnoError(8)
            if (0 == (2097155 & r.flags)) throw new mr.ErrnoError(8)
            if (mr.isDir(r.node.mode)) throw new mr.ErrnoError(31)
            if (!r.stream_ops.write) throw new mr.ErrnoError(28)
            r.seekable && 1024 & r.flags && mr.llseek(r, 0, 2)
            var i = void 0 !== o
            if (i) {
              if (!r.seekable) throw new mr.ErrnoError(70)
            } else o = r.position
            var s = r.stream_ops.write(r, e, t, n, o, a)
            return i || (r.position += s), s
          },
          allocate(r, e, t) {
            if (mr.isClosed(r)) throw new mr.ErrnoError(8)
            if (e < 0 || t <= 0) throw new mr.ErrnoError(28)
            if (0 == (2097155 & r.flags)) throw new mr.ErrnoError(8)
            if (!mr.isFile(r.node.mode) && !mr.isDir(r.node.mode)) throw new mr.ErrnoError(43)
            if (!r.stream_ops.allocate) throw new mr.ErrnoError(138)
            r.stream_ops.allocate(r, e, t)
          },
          mmap(r, e, t, n, o) {
            if (0 != (2 & n) && 0 == (2 & o) && 2 != (2097155 & r.flags)) throw new mr.ErrnoError(2)
            if (1 == (2097155 & r.flags)) throw new mr.ErrnoError(2)
            if (!r.stream_ops.mmap) throw new mr.ErrnoError(43)
            return r.stream_ops.mmap(r, e, t, n, o)
          },
          msync: (r, e, t, n, o) => (r.stream_ops.msync ? r.stream_ops.msync(r, e, t, n, o) : 0),
          ioctl(r, e, t) {
            if (!r.stream_ops.ioctl) throw new mr.ErrnoError(59)
            return r.stream_ops.ioctl(r, e, t)
          },
          readFile(r, e = {}) {
            if (
              ((e.flags = e.flags || 0), (e.encoding = e.encoding || "binary"), "utf8" !== e.encoding && "binary" !== e.encoding)
            )
              throw new Error(`Invalid encoding type "${e.encoding}"`)
            var t,
              n = mr.open(r, e.flags),
              o = mr.stat(r).size,
              a = new Uint8Array(o)
            return (
              mr.read(n, a, 0, o, 0), "utf8" === e.encoding ? (t = nr(a, 0)) : "binary" === e.encoding && (t = a), mr.close(n), t
            )
          },
          writeFile(r, e, t = {}) {
            t.flags = t.flags || 577
            var n = mr.open(r, t.flags, t.mode)
            if ("string" == typeof e) {
              var o = new Uint8Array(ar(e) + 1),
                a = ir(e, o, 0, o.length)
              mr.write(n, o, 0, a, void 0, t.canOwn)
            } else {
              if (!ArrayBuffer.isView(e)) throw new Error("Unsupported data type")
              mr.write(n, e, 0, e.byteLength, void 0, t.canOwn)
            }
            mr.close(n)
          },
          cwd: () => mr.currentPath,
          chdir(r) {
            var e = mr.lookupPath(r, { follow: !0 })
            if (null === e.node) throw new mr.ErrnoError(44)
            if (!mr.isDir(e.node.mode)) throw new mr.ErrnoError(54)
            var t = mr.nodePermissions(e.node, "x")
            if (t) throw new mr.ErrnoError(t)
            mr.currentPath = e.path
          },
          createDefaultDirectories() {
            mr.mkdir("/tmp"), mr.mkdir("/home"), mr.mkdir("/home/web_user")
          },
          createDefaultDevices() {
            mr.mkdir("/dev"),
              mr.registerDevice(mr.makedev(1, 3), { read: () => 0, write: (r, e, t, n, o) => n }),
              mr.mkdev("/dev/null", mr.makedev(1, 3)),
              ur.register(mr.makedev(5, 0), ur.default_tty_ops),
              ur.register(mr.makedev(6, 0), ur.default_tty1_ops),
              mr.mkdev("/dev/tty", mr.makedev(5, 0)),
              mr.mkdev("/dev/tty1", mr.makedev(6, 0))
            var r = new Uint8Array(1024),
              e = 0,
              t = () => (0 === e && (e = rr(r).byteLength), r[--e])
            mr.createDevice("/dev", "random", t),
              mr.createDevice("/dev", "urandom", t),
              mr.mkdir("/dev/shm"),
              mr.mkdir("/dev/shm/tmp")
          },
          createSpecialDirectories() {
            mr.mkdir("/proc")
            var r = mr.mkdir("/proc/self")
            mr.mkdir("/proc/self/fd"),
              mr.mount(
                {
                  mount() {
                    var e = mr.createNode(r, "fd", 16895, 73)
                    return (
                      (e.node_ops = {
                        lookup(r, e) {
                          var t = +e,
                            n = mr.getStreamChecked(t),
                            o = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => n.path } }
                          return (o.parent = o), o
                        },
                      }),
                      e
                    )
                  },
                },
                {},
                "/proc/self/fd",
              )
          },
          createStandardStreams() {
            s.stdin ? mr.createDevice("/dev", "stdin", s.stdin) : mr.symlink("/dev/tty", "/dev/stdin"),
              s.stdout ? mr.createDevice("/dev", "stdout", null, s.stdout) : mr.symlink("/dev/tty", "/dev/stdout"),
              s.stderr ? mr.createDevice("/dev", "stderr", null, s.stderr) : mr.symlink("/dev/tty1", "/dev/stderr")
            mr.open("/dev/stdin", 0), mr.open("/dev/stdout", 1), mr.open("/dev/stderr", 1)
          },
          staticInit() {
            ;[44].forEach(r => {
              ;(mr.genericErrors[r] = new mr.ErrnoError(r)), (mr.genericErrors[r].stack = "<generic error, no stack>")
            }),
              (mr.nameTable = new Array(4096)),
              mr.mount(dr, {}, "/"),
              mr.createDefaultDirectories(),
              mr.createDefaultDevices(),
              mr.createSpecialDirectories(),
              (mr.filesystems = { MEMFS: dr })
          },
          init(r, e, t) {
            ;(mr.init.initialized = !0),
              (s.stdin = r || s.stdin),
              (s.stdout = e || s.stdout),
              (s.stderr = t || s.stderr),
              mr.createStandardStreams()
          },
          quit() {
            mr.init.initialized = !1
            for (var r = 0; r < mr.streams.length; r++) {
              var e = mr.streams[r]
              e && mr.close(e)
            }
          },
          findObject(r, e) {
            var t = mr.analyzePath(r, e)
            return t.exists ? t.object : null
          },
          analyzePath(r, e) {
            try {
              r = (n = mr.lookupPath(r, { follow: !e })).path
            } catch (r) {}
            var t = {
              isRoot: !1,
              exists: !1,
              error: 0,
              name: null,
              path: null,
              object: null,
              parentExists: !1,
              parentPath: null,
              parentObject: null,
            }
            try {
              var n = mr.lookupPath(r, { parent: !0 })
              ;(t.parentExists = !0),
                (t.parentPath = n.path),
                (t.parentObject = n.node),
                (t.name = Q.basename(r)),
                (n = mr.lookupPath(r, { follow: !e })),
                (t.exists = !0),
                (t.path = n.path),
                (t.object = n.node),
                (t.name = n.node.name),
                (t.isRoot = "/" === n.path)
            } catch (r) {
              t.error = r.errno
            }
            return t
          },
          createPath(r, e, t, n) {
            r = "string" == typeof r ? r : mr.getPath(r)
            for (var o = e.split("/").reverse(); o.length; ) {
              var a = o.pop()
              if (a) {
                var i = Q.join2(r, a)
                try {
                  mr.mkdir(i)
                } catch (r) {}
                r = i
              }
            }
            return i
          },
          createFile(r, e, t, n, o) {
            var a = Q.join2("string" == typeof r ? r : mr.getPath(r), e),
              i = fr(n, o)
            return mr.create(a, i)
          },
          createDataFile(r, e, t, n, o, a) {
            var i = e
            r && ((r = "string" == typeof r ? r : mr.getPath(r)), (i = e ? Q.join2(r, e) : r))
            var s = fr(n, o),
              u = mr.create(i, s)
            if (t) {
              if ("string" == typeof t) {
                for (var l = new Array(t.length), d = 0, c = t.length; d < c; ++d) l[d] = t.charCodeAt(d)
                t = l
              }
              mr.chmod(u, 146 | s)
              var f = mr.open(u, 577)
              mr.write(f, t, 0, t.length, 0, a), mr.close(f), mr.chmod(u, s)
            }
          },
          createDevice(r, e, t, n) {
            var o = Q.join2("string" == typeof r ? r : mr.getPath(r), e),
              a = fr(!!t, !!n)
            mr.createDevice.major || (mr.createDevice.major = 64)
            var i = mr.makedev(mr.createDevice.major++, 0)
            return (
              mr.registerDevice(i, {
                open(r) {
                  r.seekable = !1
                },
                close(r) {
                  n?.buffer?.length && n(10)
                },
                read(r, e, n, o, a) {
                  for (var i = 0, s = 0; s < o; s++) {
                    var u
                    try {
                      u = t()
                    } catch (r) {
                      throw new mr.ErrnoError(29)
                    }
                    if (void 0 === u && 0 === i) throw new mr.ErrnoError(6)
                    if (null == u) break
                    i++, (e[n + s] = u)
                  }
                  return i && (r.node.timestamp = Date.now()), i
                },
                write(r, e, t, o, a) {
                  for (var i = 0; i < o; i++)
                    try {
                      n(e[t + i])
                    } catch (r) {
                      throw new mr.ErrnoError(29)
                    }
                  return o && (r.node.timestamp = Date.now()), i
                },
              }),
              mr.mkdev(o, a, i)
            )
          },
          forceLoadFile(r) {
            if (r.isDevice || r.isFolder || r.link || r.contents) return !0
            if ("undefined" != typeof XMLHttpRequest)
              throw new Error(
                "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.",
              )
            if (!o) throw new Error("Cannot load without read() or XMLHttpRequest.")
            try {
              ;(r.contents = sr(o(r.url), !0)), (r.usedBytes = r.contents.length)
            } catch (r) {
              throw new mr.ErrnoError(29)
            }
          },
          createLazyFile(r, e, t, n, o) {
            class a {
              constructor() {
                ;(this.lengthKnown = !1), (this.chunks = [])
              }
              get(r) {
                if (!(r > this.length - 1 || r < 0)) {
                  var e = r % this.chunkSize,
                    t = (r / this.chunkSize) | 0
                  return this.getter(t)[e]
                }
              }
              setDataGetter(r) {
                this.getter = r
              }
              cacheLength() {
                var r = new XMLHttpRequest()
                if ((r.open("HEAD", t, !1), r.send(null), !((r.status >= 200 && r.status < 300) || 304 === r.status)))
                  throw new Error("Couldn't load " + t + ". Status: " + r.status)
                var e,
                  n = Number(r.getResponseHeader("Content-length")),
                  o = (e = r.getResponseHeader("Accept-Ranges")) && "bytes" === e,
                  a = (e = r.getResponseHeader("Content-Encoding")) && "gzip" === e,
                  i = 1048576
                o || (i = n)
                var s = this
                s.setDataGetter(r => {
                  var e = r * i,
                    o = (r + 1) * i - 1
                  if (
                    ((o = Math.min(o, n - 1)),
                    void 0 === s.chunks[r] &&
                      (s.chunks[r] = ((r, e) => {
                        if (r > e) throw new Error("invalid range (" + r + ", " + e + ") or no bytes requested!")
                        if (e > n - 1) throw new Error("only " + n + " bytes available! programmer error!")
                        var o = new XMLHttpRequest()
                        if (
                          (o.open("GET", t, !1),
                          n !== i && o.setRequestHeader("Range", "bytes=" + r + "-" + e),
                          (o.responseType = "arraybuffer"),
                          o.overrideMimeType && o.overrideMimeType("text/plain; charset=x-user-defined"),
                          o.send(null),
                          !((o.status >= 200 && o.status < 300) || 304 === o.status))
                        )
                          throw new Error("Couldn't load " + t + ". Status: " + o.status)
                        return void 0 !== o.response ? new Uint8Array(o.response || []) : sr(o.responseText || "", !0)
                      })(e, o)),
                    void 0 === s.chunks[r])
                  )
                    throw new Error("doXHR failed!")
                  return s.chunks[r]
                }),
                  (!a && n) ||
                    ((i = n = 1),
                    (n = this.getter(0).length),
                    (i = n),
                    E("LazyFiles on gzip forces download of the whole file when length is accessed")),
                  (this._length = n),
                  (this._chunkSize = i),
                  (this.lengthKnown = !0)
              }
              get length() {
                return this.lengthKnown || this.cacheLength(), this._length
              }
              get chunkSize() {
                return this.lengthKnown || this.cacheLength(), this._chunkSize
              }
            }
            if ("undefined" != typeof XMLHttpRequest) {
              if (!d)
                throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"
              var i = { isDevice: !1, contents: new a() }
            } else i = { isDevice: !1, url: t }
            var s = mr.createFile(r, e, i, n, o)
            i.contents ? (s.contents = i.contents) : i.url && ((s.contents = null), (s.url = i.url)),
              Object.defineProperties(s, {
                usedBytes: {
                  get: function () {
                    return this.contents.length
                  },
                },
              })
            var u = {}
            function l(r, e, t, n, o) {
              var a = r.node.contents
              if (o >= a.length) return 0
              var i = Math.min(a.length - o, n)
              if (a.slice) for (var s = 0; s < i; s++) e[t + s] = a[o + s]
              else for (s = 0; s < i; s++) e[t + s] = a.get(o + s)
              return i
            }
            return (
              Object.keys(s.stream_ops).forEach(r => {
                var e = s.stream_ops[r]
                u[r] = (...r) => (mr.forceLoadFile(s), e(...r))
              }),
              (u.read = (r, e, t, n, o) => (mr.forceLoadFile(s), l(r, e, t, n, o))),
              (u.mmap = (r, e, t, n, o) => {
                mr.forceLoadFile(s)
                var a = lr(e)
                if (!a) throw new mr.ErrnoError(48)
                return l(r, b, a, e, t), { ptr: a, allocated: !0 }
              }),
              (s.stream_ops = u),
              s
            )
          },
        },
        hr = (r, e) => (r ? nr(k, r, e) : ""),
        pr = {
          DEFAULT_POLLMASK: 5,
          calculateAt(r, e, t) {
            if (Q.isAbs(e)) return e
            var n
            ;-100 === r ? (n = mr.cwd()) : (n = pr.getStreamFromFD(r).path)
            if (0 == e.length) {
              if (!t) throw new mr.ErrnoError(44)
              return n
            }
            return Q.join2(n, e)
          },
          doStat(r, e, t) {
            var n = r(e)
            ;(D[t >> 2] = n.dev),
              (D[(t + 4) >> 2] = n.mode),
              (A[(t + 8) >> 2] = n.nlink),
              (D[(t + 12) >> 2] = n.uid),
              (D[(t + 16) >> 2] = n.gid),
              (D[(t + 20) >> 2] = n.rdev),
              (Y = [
                n.size >>> 0,
                ((H = n.size),
                +Math.abs(H) >= 1
                  ? H > 0
                    ? +Math.floor(H / 4294967296) >>> 0
                    : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
              (D[(t + 24) >> 2] = Y[0]),
              (D[(t + 28) >> 2] = Y[1]),
              (D[(t + 32) >> 2] = 4096),
              (D[(t + 36) >> 2] = n.blocks)
            var o = n.atime.getTime(),
              a = n.mtime.getTime(),
              i = n.ctime.getTime()
            return (
              (Y = [
                Math.floor(o / 1e3) >>> 0,
                ((H = Math.floor(o / 1e3)),
                +Math.abs(H) >= 1
                  ? H > 0
                    ? +Math.floor(H / 4294967296) >>> 0
                    : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
              (D[(t + 40) >> 2] = Y[0]),
              (D[(t + 44) >> 2] = Y[1]),
              (A[(t + 48) >> 2] = (o % 1e3) * 1e3),
              (Y = [
                Math.floor(a / 1e3) >>> 0,
                ((H = Math.floor(a / 1e3)),
                +Math.abs(H) >= 1
                  ? H > 0
                    ? +Math.floor(H / 4294967296) >>> 0
                    : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
              (D[(t + 56) >> 2] = Y[0]),
              (D[(t + 60) >> 2] = Y[1]),
              (A[(t + 64) >> 2] = (a % 1e3) * 1e3),
              (Y = [
                Math.floor(i / 1e3) >>> 0,
                ((H = Math.floor(i / 1e3)),
                +Math.abs(H) >= 1
                  ? H > 0
                    ? +Math.floor(H / 4294967296) >>> 0
                    : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
              (D[(t + 72) >> 2] = Y[0]),
              (D[(t + 76) >> 2] = Y[1]),
              (A[(t + 80) >> 2] = (i % 1e3) * 1e3),
              (Y = [
                n.ino >>> 0,
                ((H = n.ino),
                +Math.abs(H) >= 1
                  ? H > 0
                    ? +Math.floor(H / 4294967296) >>> 0
                    : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
              (D[(t + 88) >> 2] = Y[0]),
              (D[(t + 92) >> 2] = Y[1]),
              0
            )
          },
          doMsync(r, e, t, n, o) {
            if (!mr.isFile(e.node.mode)) throw new mr.ErrnoError(43)
            if (2 & n) return 0
            var a = k.slice(r, r + t)
            mr.msync(e, a, o, t, n)
          },
          getStreamFromFD: r => mr.getStreamChecked(r),
          varargs: void 0,
          getStr: r => hr(r),
        }
      function vr() {
        var r = D[+pr.varargs >> 2]
        return (pr.varargs += 4), r
      }
      var gr = vr
      var wr,
        yr,
        Er,
        _r = r => {
          for (var e = "", t = r; k[t]; ) e += wr[k[t++]]
          return e
        },
        br = {},
        kr = {},
        Fr = {},
        Sr = r => {
          throw new yr(r)
        },
        Dr = r => {
          throw new Er(r)
        }
      function Ar(r, e, t = {}) {
        if (!("argPackAdvance" in e)) throw new TypeError("registerType registeredInstance requires argPackAdvance")
        return (function (r, e, t = {}) {
          var n = e.name
          if ((r || Sr(`type "${n}" must have a positive integer typeid pointer`), kr.hasOwnProperty(r))) {
            if (t.ignoreDuplicateRegistrations) return
            Sr(`Cannot register type '${n}' twice`)
          }
          if (((kr[r] = e), delete Fr[r], br.hasOwnProperty(r))) {
            var o = br[r]
            delete br[r], o.forEach(r => r())
          }
        })(r, e, t)
      }
      var Mr = [],
        Pr = [],
        Tr = r => {
          r > 9 && 0 == --Pr[r + 1] && ((Pr[r] = void 0), Mr.push(r))
        },
        Cr = () => Pr.length / 2 - 5 - Mr.length,
        jr = r => (r || Sr("Cannot use deleted val. handle = " + r), Pr[r]),
        xr = r => {
          switch (r) {
            case void 0:
              return 2
            case null:
              return 4
            case !0:
              return 6
            case !1:
              return 8
            default: {
              const e = Mr.pop() || Pr.length
              return (Pr[e] = r), (Pr[e + 1] = 1), e
            }
          }
        }
      function Rr(r) {
        return this.fromWireType(A[r >> 2])
      }
      var Or = {
          name: "emscripten::val",
          fromWireType: r => {
            var e = jr(r)
            return Tr(r), e
          },
          toWireType: (r, e) => xr(e),
          argPackAdvance: 8,
          readValueFromPointer: Rr,
          destructorFunction: null,
        },
        $r = (r, e) => {
          switch (e) {
            case 4:
              return function (r) {
                return this.fromWireType(M[r >> 2])
              }
            case 8:
              return function (r) {
                return this.fromWireType(P[r >> 3])
              }
            default:
              throw new TypeError(`invalid float width (${e}): ${r}`)
          }
        },
        zr = (r, e) => Object.defineProperty(e, "name", { value: r }),
        Nr = r => {
          for (; r.length; ) {
            var e = r.pop()
            r.pop()(e)
          }
        }
      function Wr(r) {
        for (var e = 1; e < r.length; ++e) if (null !== r[e] && void 0 === r[e].destructorFunction) return !0
        return !1
      }
      function Ir(r, e) {
        if (!(r instanceof Function)) throw new TypeError(`new_ called with constructor type ${typeof r} which is not a function`)
        var t = zr(r.name || "unknownFunctionName", function () {})
        t.prototype = r.prototype
        var n = new t(),
          o = r.apply(n, e)
        return o instanceof Object ? o : n
      }
      function Lr(r, e, t, n, o, a) {
        var i = e.length
        i < 2 && Sr("argTypes array size mismatch! Must at least get return value and 'this' types!")
        for (
          var s = null !== e[1] && null !== t, u = Wr(e), l = "void" !== e[0].name, d = [r, Sr, n, o, Nr, e[0], e[1]], c = 0;
          c < i - 2;
          ++c
        )
          d.push(e[c + 2])
        if (!u) for (c = s ? 1 : 2; c < e.length; ++c) null !== e[c].destructorFunction && d.push(e[c].destructorFunction)
        let [f, m] = (function (r, e, t, n) {
          for (var o = Wr(r), a = r.length, i = "", s = "", u = 0; u < a - 2; ++u)
            (i += (0 !== u ? ", " : "") + "arg" + u), (s += (0 !== u ? ", " : "") + "arg" + u + "Wired")
          var l = `\n        return function (${i}) {\n        if (arguments.length !== ${a - 2}) {\n          throwBindingError('function ' + humanName + ' called with ' + arguments.length + ' arguments, expected ${a - 2}');\n        }`
          o && (l += "var destructors = [];\n")
          var d = o ? "destructors" : "null",
            c = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"]
          for (e && (l += "var thisWired = classParam['toWireType'](" + d + ", this);\n"), u = 0; u < a - 2; ++u)
            (l += "var arg" + u + "Wired = argType" + u + "['toWireType'](" + d + ", arg" + u + ");\n"), c.push("argType" + u)
          if (
            (e && (s = "thisWired" + (s.length > 0 ? ", " : "") + s),
            (l += (t || n ? "var rv = " : "") + "invoker(fn" + (s.length > 0 ? ", " : "") + s + ");\n"),
            o)
          )
            l += "runDestructors(destructors);\n"
          else
            for (u = e ? 1 : 2; u < r.length; ++u) {
              var f = 1 === u ? "thisWired" : "arg" + (u - 2) + "Wired"
              null !== r[u].destructorFunction && ((l += `${f}_dtor(${f});\n`), c.push(`${f}_dtor`))
            }
          return t && (l += "var ret = retType['fromWireType'](rv);\nreturn ret;\n"), [c, (l += "}\n")]
        })(e, s, l, a)
        f.push(m)
        var h = Ir(Function, f)(...d)
        return zr(r, h)
      }
      var Br,
        Ur,
        Hr = (r, e, t) => {
          if (void 0 === r[e].overloadTable) {
            var n = r[e]
            ;(r[e] = function (...n) {
              return (
                r[e].overloadTable.hasOwnProperty(n.length) ||
                  Sr(
                    `Function '${t}' called with an invalid number of arguments (${n.length}) - expects one of (${r[e].overloadTable})!`,
                  ),
                r[e].overloadTable[n.length].apply(this, n)
              )
            }),
              (r[e].overloadTable = []),
              (r[e].overloadTable[n.argCount] = n)
          }
        },
        Yr = [],
        qr = r => {
          var e = Yr[r]
          return e || (r >= Yr.length && (Yr.length = r + 1), (Yr[r] = e = Br.get(r))), e
        },
        Vr = (r, e, t = []) =>
          r.includes("j") ? ((r, e, t) => ((r = r.replace(/p/g, "i")), (0, s["dynCall_" + r])(e, ...t)))(r, e, t) : qr(e)(...t),
        Xr = (r, e) => {
          var t,
            n,
            o = (r = _r(r)).includes("j") ? ((t = r), (n = e), (...r) => Vr(t, n, r)) : qr(e)
          return "function" != typeof o && Sr(`unknown function pointer with signature ${r}: ${e}`), o
        },
        Gr = r => {
          var e = Re(r),
            t = _r(e)
          return $e(e), t
        },
        Kr = (r, e, t) => {
          switch (e) {
            case 1:
              return t ? r => b[r] : r => k[r]
            case 2:
              return t ? r => F[r >> 1] : r => S[r >> 1]
            case 4:
              return t ? r => D[r >> 2] : r => A[r >> 2]
            default:
              throw new TypeError(`invalid integer width (${e}): ${r}`)
          }
        },
        Zr = (r, e, t) => ir(r, k, e, t),
        Jr = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0,
        Qr = (r, e) => {
          for (var t = r, n = t >> 1, o = n + e / 2; !(n >= o) && S[n]; ) ++n
          if ((t = n << 1) - r > 32 && Jr) return Jr.decode(k.subarray(r, t))
          for (var a = "", i = 0; !(i >= e / 2); ++i) {
            var s = F[(r + 2 * i) >> 1]
            if (0 == s) break
            a += String.fromCharCode(s)
          }
          return a
        },
        re = (r, e, t) => {
          if (((t ??= 2147483647), t < 2)) return 0
          for (var n = e, o = (t -= 2) < 2 * r.length ? t / 2 : r.length, a = 0; a < o; ++a) {
            var i = r.charCodeAt(a)
            ;(F[e >> 1] = i), (e += 2)
          }
          return (F[e >> 1] = 0), e - n
        },
        ee = r => 2 * r.length,
        te = (r, e) => {
          for (var t = 0, n = ""; !(t >= e / 4); ) {
            var o = D[(r + 4 * t) >> 2]
            if (0 == o) break
            if ((++t, o >= 65536)) {
              var a = o - 65536
              n += String.fromCharCode(55296 | (a >> 10), 56320 | (1023 & a))
            } else n += String.fromCharCode(o)
          }
          return n
        },
        ne = (r, e, t) => {
          if (((t ??= 2147483647), t < 4)) return 0
          for (var n = e, o = n + t - 4, a = 0; a < r.length; ++a) {
            var i = r.charCodeAt(a)
            if (i >= 55296 && i <= 57343) i = (65536 + ((1023 & i) << 10)) | (1023 & r.charCodeAt(++a))
            if (((D[e >> 2] = i), (e += 4) + 4 > o)) break
          }
          return (D[e >> 2] = 0), e - n
        },
        oe = r => {
          for (var e = 0, t = 0; t < r.length; ++t) {
            var n = r.charCodeAt(t)
            n >= 55296 && n <= 57343 && ++t, (e += 4)
          }
          return e
        },
        ae = r => {
          for (var e = r.split("."), t = 0; t < 4; t++) {
            var n = Number(e[t])
            if (isNaN(n)) return null
            e[t] = n
          }
          return (e[0] | (e[1] << 8) | (e[2] << 16) | (e[3] << 24)) >>> 0
        },
        ie = r => parseInt(r),
        se = {
          address_map: { id: 1, addrs: {}, names: {} },
          lookup_name(r) {
            var e,
              t,
              n = ae(r)
            if (null !== n) return r
            if (
              null !==
              (n = (r => {
                var e,
                  t,
                  n,
                  o,
                  a = []
                if (
                  !/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(
                    r,
                  )
                )
                  return null
                if ("::" === r) return [0, 0, 0, 0, 0, 0, 0, 0]
                for (
                  (r = r.startsWith("::") ? r.replace("::", "Z:") : r.replace("::", ":Z:")).indexOf(".") > 0
                    ? (((e = (r = r.replace(new RegExp("[.]", "g"), ":")).split(":"))[e.length - 4] =
                        ie(e[e.length - 4]) + 256 * ie(e[e.length - 3])),
                      (e[e.length - 3] = ie(e[e.length - 2]) + 256 * ie(e[e.length - 1])),
                      (e = e.slice(0, e.length - 2)))
                    : (e = r.split(":")),
                    n = 0,
                    o = 0,
                    t = 0;
                  t < e.length;
                  t++
                )
                  if ("string" == typeof e[t])
                    if ("Z" === e[t]) {
                      for (o = 0; o < 8 - e.length + 1; o++) a[t + o] = 0
                      n = o - 1
                    } else a[t + n] = ze(parseInt(e[t], 16))
                  else a[t + n] = e[t]
                return [(a[1] << 16) | a[0], (a[3] << 16) | a[2], (a[5] << 16) | a[4], (a[7] << 16) | a[6]]
              })(r))
            )
              return r
            if (se.address_map.addrs[r]) e = se.address_map.addrs[r]
            else {
              var o = se.address_map.id++
              ;(t = "exceeded max address mappings of 65535"),
                o < 65535 || L(t),
                (e = "172.29." + (255 & o) + "." + (65280 & o)),
                (se.address_map.names[e] = r),
                (se.address_map.addrs[r] = e)
            }
            return e
          },
          lookup_addr: r => (se.address_map.names[r] ? se.address_map.names[r] : null),
        },
        ue = (r, e) => {
          var t = kr[r]
          return void 0 === t && Sr(`${e} has unknown type ${Gr(r)}`), t
        },
        le = (r, e, t) => {
          var n = [],
            o = r.toWireType(n, t)
          return n.length && (A[e >> 2] = xr(n)), o
        },
        de = {},
        ce = r => {
          var e = de[r]
          return void 0 === e ? _r(r) : e
        },
        fe = [],
        me = () => ("object" == typeof globalThis ? globalThis : Function("return this")()),
        he = (Reflect.construct, r => r % 4 == 0 && (r % 100 != 0 || r % 400 == 0)),
        pe = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
        ve = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        ge = (r, e) => ((e + 2097152) >>> 0 < 4194305 - !!r ? (r >>> 0) + 4294967296 * e : NaN)
      var we = r => {
        ;(we.shown ||= {}), we.shown[r] || ((we.shown[r] = 1), c && (r = "warning: " + r), _(r))
      }
      function ye(r) {
        var e = new Error().stack.toString(),
          t = e.lastIndexOf("_emscripten_log"),
          n = e.lastIndexOf("_emscripten_get_callstack"),
          o = e.indexOf("\n", Math.max(t, n)) + 1
        ;(e = e.slice(o)),
          8 & r &&
            "undefined" == typeof emscripten_source_map &&
            (we(
              'Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.',
            ),
            (r ^= 8),
            (r |= 16))
        var a = e.split("\n")
        e = ""
        var i = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)"),
          s = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?"),
          u = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)")
        for (var l in a) {
          var d = a[l],
            c = "",
            f = "",
            m = 0,
            h = 0,
            p = u.exec(d)
          if (p && 5 == p.length) (c = p[1]), (f = p[2]), (m = p[3]), (h = p[4])
          else {
            if (((p = i.exec(d)) || (p = s.exec(d)), !(p && p.length >= 4))) {
              e += d + "\n"
              continue
            }
            ;(c = p[1]), (f = p[2]), (m = p[3]), (h = 0 | p[4])
          }
          var v = !1
          if (8 & r) {
            var g = emscripten_source_map.originalPositionFor({ line: m, column: h })
            ;(v = g?.source),
              v &&
                (64 & r && (g.source = g.source.substring(g.source.replace(/\\/g, "/").lastIndexOf("/") + 1)),
                (e += `    at ${c} (${g.source}:${g.line}:${g.column})\n`))
          }
          ;(16 & r || !v) &&
            (64 & r && (f = f.substring(f.replace(/\\/g, "/").lastIndexOf("/") + 1)),
            (e += (v ? `     = ${c}` : `    at ${c}`) + ` (${f}:${m}:${h})\n`))
        }
        return (e = e.replace(/\s+$/, ""))
      }
      var Ee = r => {
          var e = (r - y.buffer.byteLength + 65535) / 65536
          try {
            return y.grow(e), C(), 1
          } catch (r) {}
        },
        _e = {},
        be = () => {
          if (!be.strings) {
            var r = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG:
                (("object" == typeof navigator && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") +
                ".UTF-8",
              _: m || "./this.program",
            }
            for (var e in _e) void 0 === _e[e] ? delete r[e] : (r[e] = _e[e])
            var t = []
            for (var e in r) t.push(`${e}=${r[e]}`)
            be.strings = t
          }
          return be.strings
        },
        ke = r => {
          r, J || (s.onExit?.(r), (T = !0)), h(r, new K(r))
        },
        Fe = (r, e) => {
          r, ke(r)
        }
      var Se,
        De,
        Ae,
        Me = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Pe = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Te = (r, e, t, n) => {
          var o = A[(n + 40) >> 2],
            a = {
              tm_sec: D[n >> 2],
              tm_min: D[(n + 4) >> 2],
              tm_hour: D[(n + 8) >> 2],
              tm_mday: D[(n + 12) >> 2],
              tm_mon: D[(n + 16) >> 2],
              tm_year: D[(n + 20) >> 2],
              tm_wday: D[(n + 24) >> 2],
              tm_yday: D[(n + 28) >> 2],
              tm_isdst: D[(n + 32) >> 2],
              tm_gmtoff: D[(n + 36) >> 2],
              tm_zone: o ? hr(o) : "",
            },
            i = hr(t),
            s = {
              "%c": "%a %b %d %H:%M:%S %Y",
              "%D": "%m/%d/%y",
              "%F": "%Y-%m-%d",
              "%h": "%b",
              "%r": "%I:%M:%S %p",
              "%R": "%H:%M",
              "%T": "%H:%M:%S",
              "%x": "%m/%d/%y",
              "%X": "%H:%M:%S",
              "%Ec": "%c",
              "%EC": "%C",
              "%Ex": "%m/%d/%y",
              "%EX": "%H:%M:%S",
              "%Ey": "%y",
              "%EY": "%Y",
              "%Od": "%d",
              "%Oe": "%e",
              "%OH": "%H",
              "%OI": "%I",
              "%Om": "%m",
              "%OM": "%M",
              "%OS": "%S",
              "%Ou": "%u",
              "%OU": "%U",
              "%OV": "%V",
              "%Ow": "%w",
              "%OW": "%W",
              "%Oy": "%y",
            }
          for (var u in s) i = i.replace(new RegExp(u, "g"), s[u])
          var l = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            d = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]
          function c(r, e, t) {
            for (var n = "number" == typeof r ? r.toString() : r || ""; n.length < e; ) n = t[0] + n
            return n
          }
          function f(r, e) {
            return c(r, e, "0")
          }
          function m(r, e) {
            function t(r) {
              return r < 0 ? -1 : r > 0 ? 1 : 0
            }
            var n
            return (
              0 === (n = t(r.getFullYear() - e.getFullYear())) &&
                0 === (n = t(r.getMonth() - e.getMonth())) &&
                (n = t(r.getDate() - e.getDate())),
              n
            )
          }
          function h(r) {
            switch (r.getDay()) {
              case 0:
                return new Date(r.getFullYear() - 1, 11, 29)
              case 1:
                return r
              case 2:
                return new Date(r.getFullYear(), 0, 3)
              case 3:
                return new Date(r.getFullYear(), 0, 2)
              case 4:
                return new Date(r.getFullYear(), 0, 1)
              case 5:
                return new Date(r.getFullYear() - 1, 11, 31)
              case 6:
                return new Date(r.getFullYear() - 1, 11, 30)
            }
          }
          function p(r) {
            var e = ((r, e) => {
                for (var t = new Date(r.getTime()); e > 0; ) {
                  var n = he(t.getFullYear()),
                    o = t.getMonth(),
                    a = (n ? Me : Pe)[o]
                  if (!(e > a - t.getDate())) return t.setDate(t.getDate() + e), t
                  ;(e -= a - t.getDate() + 1),
                    t.setDate(1),
                    o < 11 ? t.setMonth(o + 1) : (t.setMonth(0), t.setFullYear(t.getFullYear() + 1))
                }
                return t
              })(new Date(r.tm_year + 1900, 0, 1), r.tm_yday),
              t = new Date(e.getFullYear(), 0, 4),
              n = new Date(e.getFullYear() + 1, 0, 4),
              o = h(t),
              a = h(n)
            return m(o, e) <= 0 ? (m(a, e) <= 0 ? e.getFullYear() + 1 : e.getFullYear()) : e.getFullYear() - 1
          }
          var v = {
            "%a": r => l[r.tm_wday].substring(0, 3),
            "%A": r => l[r.tm_wday],
            "%b": r => d[r.tm_mon].substring(0, 3),
            "%B": r => d[r.tm_mon],
            "%C": r => f(((r.tm_year + 1900) / 100) | 0, 2),
            "%d": r => f(r.tm_mday, 2),
            "%e": r => c(r.tm_mday, 2, " "),
            "%g": r => p(r).toString().substring(2),
            "%G": p,
            "%H": r => f(r.tm_hour, 2),
            "%I": r => {
              var e = r.tm_hour
              return 0 == e ? (e = 12) : e > 12 && (e -= 12), f(e, 2)
            },
            "%j": r =>
              f(
                r.tm_mday +
                  ((r, e) => {
                    for (var t = 0, n = 0; n <= e; t += r[n++]);
                    return t
                  })(he(r.tm_year + 1900) ? Me : Pe, r.tm_mon - 1),
                3,
              ),
            "%m": r => f(r.tm_mon + 1, 2),
            "%M": r => f(r.tm_min, 2),
            "%n": () => "\n",
            "%p": r => (r.tm_hour >= 0 && r.tm_hour < 12 ? "AM" : "PM"),
            "%S": r => f(r.tm_sec, 2),
            "%t": () => "\t",
            "%u": r => r.tm_wday || 7,
            "%U": r => {
              var e = r.tm_yday + 7 - r.tm_wday
              return f(Math.floor(e / 7), 2)
            },
            "%V": r => {
              var e = Math.floor((r.tm_yday + 7 - ((r.tm_wday + 6) % 7)) / 7)
              if (((r.tm_wday + 371 - r.tm_yday - 2) % 7 <= 2 && e++, e)) {
                if (53 == e) {
                  var t = (r.tm_wday + 371 - r.tm_yday) % 7
                  4 == t || (3 == t && he(r.tm_year)) || (e = 1)
                }
              } else {
                e = 52
                var n = (r.tm_wday + 7 - r.tm_yday - 1) % 7
                ;(4 == n || (5 == n && he((r.tm_year % 400) - 1))) && e++
              }
              return f(e, 2)
            },
            "%w": r => r.tm_wday,
            "%W": r => {
              var e = r.tm_yday + 7 - ((r.tm_wday + 6) % 7)
              return f(Math.floor(e / 7), 2)
            },
            "%y": r => (r.tm_year + 1900).toString().substring(2),
            "%Y": r => r.tm_year + 1900,
            "%z": r => {
              var e = r.tm_gmtoff,
                t = e >= 0
              return (e = ((e = Math.abs(e) / 60) / 60) * 100 + (e % 60)), (t ? "+" : "-") + String("0000" + e).slice(-4)
            },
            "%Z": r => r.tm_zone,
            "%%": () => "%",
          }
          for (var u in ((i = i.replace(/%%/g, "\0\0")), v)) i.includes(u) && (i = i.replace(new RegExp(u, "g"), v[u](a)))
          var g,
            w,
            y = sr((i = i.replace(/\0\0/g, "%")), !1)
          return y.length > e ? 0 : ((g = y), (w = r), b.set(g, w), y.length - 1)
        }
      ;(mr.createPreloadedFile = (r, e, t, n, o, i, s, u, l, d) => {
        var c = e ? er.resolve(Q.join2(r, e)) : r
        function f(t) {
          function a(t) {
            d?.(),
              u ||
                ((r, e, t, n, o, a) => {
                  mr.createDataFile(r, e, t, n, o, a)
                })(r, e, t, n, o, l),
              i?.(),
              I()
          }
          ;((r, e, t, n) => {
            "undefined" != typeof Browser && Browser.init()
            var o = !1
            return (
              cr.forEach(a => {
                o || (a.canHandle(e) && (a.handle(r, e, t, n), (o = !0)))
              }),
              o
            )
          })(t, c, a, () => {
            s?.(), I()
          }) || a(t)
        }
        W(),
          "string" == typeof t
            ? ((r, e, t, n) => {
                var o = n ? "" : `al ${r}`
                a(
                  r,
                  r => {
                    e(new Uint8Array(r)), o && I()
                  },
                  e => {
                    if (!t) throw `Loading data file "${r}" failed.`
                    t()
                  },
                ),
                  o && W()
              })(t, f, s)
            : f(t)
      }),
        mr.staticInit(),
        (() => {
          for (var r = new Array(256), e = 0; e < 256; ++e) r[e] = String.fromCharCode(e)
          wr = r
        })(),
        (yr = s.BindingError =
          class extends Error {
            constructor(r) {
              super(r), (this.name = "BindingError")
            }
          }),
        (Er = s.InternalError =
          class extends Error {
            constructor(r) {
              super(r), (this.name = "InternalError")
            }
          }),
        Pr.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1),
        (s.count_emval_handles = Cr),
        (Ur = s.UnboundTypeError =
          ((Se = Error),
          ((Ae = zr((De = "UnboundTypeError"), function (r) {
            ;(this.name = De), (this.message = r)
            var e = new Error(r).stack
            void 0 !== e && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""))
          })).prototype = Object.create(Se.prototype)),
          (Ae.prototype.constructor = Ae),
          (Ae.prototype.toString = function () {
            return void 0 === this.message ? this.name : `${this.name}: ${this.message}`
          }),
          Ae))
      var Ce,
        je = {
          O: function (r, e) {
            try {
              return (r = pr.getStr(r)), mr.chmod(r, e), 0
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          P: function (r, e, t, n) {
            try {
              if (((e = pr.getStr(e)), (e = pr.calculateAt(r, e)), -8 & t)) return -28
              var o = mr.lookupPath(e, { follow: !0 }).node
              if (!o) return -44
              var a = ""
              return 4 & t && (a += "r"), 2 & t && (a += "w"), 1 & t && (a += "x"), a && mr.nodePermissions(o, a) ? -2 : 0
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          i: function (r, e, t) {
            pr.varargs = t
            try {
              var n = pr.getStreamFromFD(r)
              switch (e) {
                case 0:
                  if ((o = vr()) < 0) return -28
                  for (; mr.streams[o]; ) o++
                  return mr.dupStream(n, o).fd
                case 1:
                case 2:
                case 13:
                case 14:
                  return 0
                case 3:
                  return n.flags
                case 4:
                  var o = vr()
                  return (n.flags |= o), 0
                case 12:
                  o = gr()
                  return (F[(o + 0) >> 1] = 2), 0
              }
              return -28
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          K: function (r, e) {
            try {
              var t = pr.getStreamFromFD(r)
              return pr.doStat(mr.stat, t.path, e)
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          R: function (r, e, t) {
            pr.varargs = t
            try {
              var n = pr.getStreamFromFD(r)
              switch (e) {
                case 21509:
                case 21510:
                case 21511:
                case 21512:
                case 21524:
                case 21515:
                  return n.tty ? 0 : -59
                case 21505:
                  if (!n.tty) return -59
                  if (n.tty.ops.ioctl_tcgets) {
                    var o = n.tty.ops.ioctl_tcgets(n),
                      a = gr()
                    ;(D[a >> 2] = o.c_iflag || 0),
                      (D[(a + 4) >> 2] = o.c_oflag || 0),
                      (D[(a + 8) >> 2] = o.c_cflag || 0),
                      (D[(a + 12) >> 2] = o.c_lflag || 0)
                    for (var i = 0; i < 32; i++) b[a + i + 17] = o.c_cc[i] || 0
                    return 0
                  }
                  return 0
                case 21506:
                case 21507:
                case 21508:
                  if (!n.tty) return -59
                  if (n.tty.ops.ioctl_tcsets) {
                    a = gr()
                    var s = D[a >> 2],
                      u = D[(a + 4) >> 2],
                      l = D[(a + 8) >> 2],
                      d = D[(a + 12) >> 2],
                      c = []
                    for (i = 0; i < 32; i++) c.push(b[a + i + 17])
                    return n.tty.ops.ioctl_tcsets(n.tty, e, { c_iflag: s, c_oflag: u, c_cflag: l, c_lflag: d, c_cc: c })
                  }
                  return 0
                case 21519:
                  if (!n.tty) return -59
                  a = gr()
                  return (D[a >> 2] = 0), 0
                case 21520:
                  return n.tty ? -28 : -59
                case 21531:
                  a = gr()
                  return mr.ioctl(n, e, a)
                case 21523:
                  if (!n.tty) return -59
                  if (n.tty.ops.ioctl_tiocgwinsz) {
                    var f = n.tty.ops.ioctl_tiocgwinsz(n.tty)
                    a = gr()
                    ;(F[a >> 1] = f[0]), (F[(a + 2) >> 1] = f[1])
                  }
                  return 0
                default:
                  return -28
              }
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          H: function (r, e) {
            try {
              return (r = pr.getStr(r)), pr.doStat(mr.lstat, r, e)
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          I: function (r, e, t, n) {
            try {
              e = pr.getStr(e)
              var o = 256 & n,
                a = 4096 & n
              return (n &= -6401), (e = pr.calculateAt(r, e, a)), pr.doStat(o ? mr.lstat : mr.stat, e, t)
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          k: function (r, e, t, n) {
            pr.varargs = n
            try {
              ;(e = pr.getStr(e)), (e = pr.calculateAt(r, e))
              var o = n ? vr() : 0
              return mr.open(e, t, o).fd
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          D: function (r) {
            try {
              return (r = pr.getStr(r)), mr.rmdir(r), 0
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          J: function (r, e) {
            try {
              return (r = pr.getStr(r)), pr.doStat(mr.stat, r, e)
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          E: function (r, e, t) {
            try {
              return (
                (e = pr.getStr(e)),
                (e = pr.calculateAt(r, e)),
                0 === t ? mr.unlink(e) : 512 === t ? mr.rmdir(e) : L("Invalid flags passed to unlinkat"),
                0
              )
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          x: (r, e, t, n, o) => {},
          W: (r, e, t, n) => {
            Ar(r, {
              name: (e = _r(e)),
              fromWireType: function (r) {
                return !!r
              },
              toWireType: function (r, e) {
                return e ? t : n
              },
              argPackAdvance: 8,
              readValueFromPointer: function (r) {
                return this.fromWireType(k[r])
              },
              destructorFunction: null,
            })
          },
          V: r => Ar(r, Or),
          o: (r, e, t) => {
            Ar(r, {
              name: (e = _r(e)),
              fromWireType: r => r,
              toWireType: (r, e) => e,
              argPackAdvance: 8,
              readValueFromPointer: $r(e, t),
              destructorFunction: null,
            })
          },
          f: (r, e, t, n, o, a, i) => {
            var u = ((r, e) => {
              for (var t = [], n = 0; n < r; n++) t.push(A[(e + 4 * n) >> 2])
              return t
            })(e, t)
            ;(r = (r => {
              const e = (r = r.trim()).indexOf("(")
              return -1 !== e ? r.substr(0, e) : r
            })((r = _r(r)))),
              (o = Xr(n, o)),
              ((r, e, t) => {
                s.hasOwnProperty(r)
                  ? ((void 0 === t || (void 0 !== s[r].overloadTable && void 0 !== s[r].overloadTable[t])) &&
                      Sr(`Cannot register public name '${r}' twice`),
                    Hr(s, r, r),
                    s.hasOwnProperty(t) &&
                      Sr(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`),
                    (s[r].overloadTable[t] = e))
                  : ((s[r] = e), void 0 !== t && (s[r].numArguments = t))
              })(
                r,
                function () {
                  ;((r, e) => {
                    var t = [],
                      n = {}
                    throw (
                      (e.forEach(function r(e) {
                        n[e] || kr[e] || (Fr[e] ? Fr[e].forEach(r) : (t.push(e), (n[e] = !0)))
                      }),
                      new Ur(`${r}: ` + t.map(Gr).join([", "])))
                    )
                  })(`Cannot call ${r} due to unbound types`, u)
                },
                e - 1,
              ),
              ((r, e, t) => {
                function n(e) {
                  var n = t(e)
                  n.length !== r.length && Dr("Mismatched type converter count")
                  for (var o = 0; o < r.length; ++o) Ar(r[o], n[o])
                }
                r.forEach(function (r) {
                  Fr[r] = e
                })
                var o = new Array(e.length),
                  a = [],
                  i = 0
                e.forEach((r, e) => {
                  kr.hasOwnProperty(r)
                    ? (o[e] = kr[r])
                    : (a.push(r),
                      br.hasOwnProperty(r) || (br[r] = []),
                      br[r].push(() => {
                        ;(o[e] = kr[r]), ++i === a.length && n(o)
                      }))
                }),
                  0 === a.length && n(o)
              })([], u, t => {
                var n = [t[0], null].concat(t.slice(1))
                return (
                  ((r, e, t) => {
                    s.hasOwnProperty(r) || Dr("Replacing nonexistent public symbol"),
                      void 0 !== s[r].overloadTable && void 0 !== t
                        ? (s[r].overloadTable[t] = e)
                        : ((s[r] = e), (s[r].argCount = t))
                  })(r, Lr(r, n, null, o, a, i), e - 1),
                  []
                )
              })
          },
          b: (r, e, t, n, o) => {
            ;(e = _r(e)), -1 === o && (o = 4294967295)
            var a = r => r
            if (0 === n) {
              var i = 32 - 8 * t
              a = r => (r << i) >>> i
            }
            var s = e.includes("unsigned")
            Ar(r, {
              name: e,
              fromWireType: a,
              toWireType: s
                ? function (r, e) {
                    return this.name, e >>> 0
                  }
                : function (r, e) {
                    return this.name, e
                  },
              argPackAdvance: 8,
              readValueFromPointer: Kr(e, t, 0 !== n),
              destructorFunction: null,
            })
          },
          a: (r, e, t) => {
            var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][e]
            function o(r) {
              var e = A[r >> 2],
                t = A[(r + 4) >> 2]
              return new n(b.buffer, t, e)
            }
            Ar(
              r,
              { name: (t = _r(t)), fromWireType: o, argPackAdvance: 8, readValueFromPointer: o },
              { ignoreDuplicateRegistrations: !0 },
            )
          },
          n: (r, e) => {
            var t = "std::string" === (e = _r(e))
            Ar(r, {
              name: e,
              fromWireType(r) {
                var e,
                  n = A[r >> 2],
                  o = r + 4
                if (t)
                  for (var a = o, i = 0; i <= n; ++i) {
                    var s = o + i
                    if (i == n || 0 == k[s]) {
                      var u = hr(a, s - a)
                      void 0 === e ? (e = u) : ((e += String.fromCharCode(0)), (e += u)), (a = s + 1)
                    }
                  }
                else {
                  var l = new Array(n)
                  for (i = 0; i < n; ++i) l[i] = String.fromCharCode(k[o + i])
                  e = l.join("")
                }
                return $e(r), e
              },
              toWireType(r, e) {
                var n
                e instanceof ArrayBuffer && (e = new Uint8Array(e))
                var o = "string" == typeof e
                o ||
                  e instanceof Uint8Array ||
                  e instanceof Uint8ClampedArray ||
                  e instanceof Int8Array ||
                  Sr("Cannot pass non-string to std::string"),
                  (n = t && o ? ar(e) : e.length)
                var a = Oe(4 + n + 1),
                  i = a + 4
                if (((A[a >> 2] = n), t && o)) Zr(e, i, n + 1)
                else if (o)
                  for (var s = 0; s < n; ++s) {
                    var u = e.charCodeAt(s)
                    u > 255 && ($e(i), Sr("String has UTF-16 code units that do not fit in 8 bits")), (k[i + s] = u)
                  }
                else for (s = 0; s < n; ++s) k[i + s] = e[s]
                return null !== r && r.push($e, a), a
              },
              argPackAdvance: 8,
              readValueFromPointer: Rr,
              destructorFunction(r) {
                $e(r)
              },
            })
          },
          j: (r, e, t) => {
            var n, o, a, i
            ;(t = _r(t)),
              2 === e
                ? ((n = Qr), (o = re), (i = ee), (a = r => S[r >> 1]))
                : 4 === e && ((n = te), (o = ne), (i = oe), (a = r => A[r >> 2])),
              Ar(r, {
                name: t,
                fromWireType: r => {
                  for (var t, o = A[r >> 2], i = r + 4, s = 0; s <= o; ++s) {
                    var u = r + 4 + s * e
                    if (s == o || 0 == a(u)) {
                      var l = n(i, u - i)
                      void 0 === t ? (t = l) : ((t += String.fromCharCode(0)), (t += l)), (i = u + e)
                    }
                  }
                  return $e(r), t
                },
                toWireType: (r, n) => {
                  "string" != typeof n && Sr(`Cannot pass non-string to C++ string type ${t}`)
                  var a = i(n),
                    s = Oe(4 + a + e)
                  return (A[s >> 2] = a / e), o(n, s + 4, a + e), null !== r && r.push($e, s), s
                },
                argPackAdvance: 8,
                readValueFromPointer: Rr,
                destructorFunction(r) {
                  $e(r)
                },
              })
          },
          X: (r, e) => {
            Ar(r, { isVoid: !0, name: (e = _r(e)), argPackAdvance: 0, fromWireType: () => {}, toWireType: (r, e) => {} })
          },
          L: () => 1,
          y: r => {
            var e = hr(r)
            return ae(se.lookup_name(e))
          },
          N: (r, e, t) => k.copyWithin(r, e, e + t),
          e: (r, e, t) => ((r = jr(r)), (e = ue(e, "emval::as")), le(e, t, r)),
          r: (r, e, t, n, o) => (r = fe[r])((e = jr(e)), e[(t = ce(t))], n, o),
          U: Tr,
          w: r => (0 === r ? xr(me()) : ((r = ce(r)), xr(me()[r]))),
          q: (r, e, t) => {
            var n = ((r, e) => {
                for (var t = new Array(r), n = 0; n < r; ++n) t[n] = ue(A[(e + 4 * n) >> 2], "parameter " + n)
                return t
              })(r, e),
              o = n.shift()
            r--
            var a = "return function (obj, func, destructorsRef, args) {\n",
              i = 0,
              s = []
            0 === t && s.push("obj")
            for (var u = ["retType"], l = [o], d = 0; d < r; ++d)
              s.push("arg" + d),
                u.push("argType" + d),
                l.push(n[d]),
                (a += `  var arg${d} = argType${d}.readValueFromPointer(args${i ? "+" + i : ""});\n`),
                (i += n[d].argPackAdvance)
            ;(a += `  var rv = ${1 === t ? "new func" : "func.call"}(${s.join(", ")});\n`),
              o.isVoid ||
                (u.push("emval_returnValue"), l.push(le), (a += "  return emval_returnValue(retType, destructorsRef, rv);\n")),
              (a += "};\n"),
              u.push(a)
            var c,
              f,
              m = Ir(Function, u)(...l),
              h = `methodCaller<(${n.map(r => r.name).join(", ")}) => ${o.name}>`
            return (c = zr(h, m)), (f = fe.length), fe.push(c), f
          },
          l: (r, e) => ((r = jr(r)), (e = jr(e)), xr(r[e])),
          Z: r => {
            r > 9 && (Pr[r + 1] += 1)
          },
          Y: () => xr([]),
          s: r => xr(ce(r)),
          _: () => xr({}),
          p: r => {
            var e = jr(r)
            Nr(e), Tr(r)
          },
          c: (r, e, t) => {
            ;(r = jr(r)), (e = jr(e)), (t = jr(t)), (r[e] = t)
          },
          d: (r, e) => {
            var t = (r = ue(r, "_emval_take_value")).readValueFromPointer(e)
            return xr(t)
          },
          u: function (r, e, t) {
            var n = ge(r, e),
              o = new Date(1e3 * n)
            ;(D[t >> 2] = o.getSeconds()),
              (D[(t + 4) >> 2] = o.getMinutes()),
              (D[(t + 8) >> 2] = o.getHours()),
              (D[(t + 12) >> 2] = o.getDate()),
              (D[(t + 16) >> 2] = o.getMonth()),
              (D[(t + 20) >> 2] = o.getFullYear() - 1900),
              (D[(t + 24) >> 2] = o.getDay())
            var a = 0 | (r => (he(r.getFullYear()) ? pe : ve)[r.getMonth()] + r.getDate() - 1)(o)
            ;(D[(t + 28) >> 2] = a), (D[(t + 36) >> 2] = -60 * o.getTimezoneOffset())
            var i = new Date(o.getFullYear(), 0, 1),
              s = new Date(o.getFullYear(), 6, 1).getTimezoneOffset(),
              u = i.getTimezoneOffset(),
              l = 0 | (s != u && o.getTimezoneOffset() == Math.min(u, s))
            D[(t + 32) >> 2] = l
          },
          t: function (r, e, t, n, o, a, i) {
            var s = ge(a, i)
            try {
              var u = pr.getStreamFromFD(o)
              2 & t && pr.doMsync(r, u, e, n, s)
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return -r.errno
            }
          },
          B: (r, e, t, n) => {
            var o = new Date().getFullYear(),
              a = new Date(o, 0, 1),
              i = new Date(o, 6, 1),
              s = a.getTimezoneOffset(),
              u = i.getTimezoneOffset(),
              l = Math.max(s, u)
            ;(A[r >> 2] = 60 * l), (D[e >> 2] = Number(s != u))
            var d = r => r.toLocaleTimeString(void 0, { hour12: !1, timeZoneName: "short" }).split(" ")[1],
              c = d(a),
              f = d(i)
            u < s ? (Zr(c, t, 17), Zr(f, n, 17)) : (Zr(c, n, 17), Zr(f, t, 17))
          },
          g: () => {
            L("")
          },
          M: () => Date.now(),
          S: function (r, e, t) {
            var n = ye(r)
            return !e || t <= 0 ? ar(n) + 1 : Zr(n, e, t) + 1
          },
          C: () => 2147483648,
          A: r => {
            var e = k.length,
              t = 2147483648
            if ((r >>>= 0) > t) return !1
            for (var n, o, a = 1; a <= 4; a *= 2) {
              var i = e * (1 + 0.2 / a)
              i = Math.min(i, r + 100663296)
              var s = Math.min(t, (n = Math.max(r, i)) + (((o = 65536) - (n % o)) % o))
              if (Ee(s)) return !0
            }
            return !1
          },
          F: (r, e) => {
            var t = 0
            return (
              be().forEach((n, o) => {
                var a = e + t
                ;(A[(r + 4 * o) >> 2] = a),
                  ((r, e) => {
                    for (var t = 0; t < r.length; ++t) b[e++] = r.charCodeAt(t)
                    b[e] = 0
                  })(n, a),
                  (t += n.length + 1)
              }),
              0
            )
          },
          G: (r, e) => {
            var t = be()
            A[r >> 2] = t.length
            var n = 0
            return t.forEach(r => (n += r.length + 1)), (A[e >> 2] = n), 0
          },
          T: Fe,
          h: function (r) {
            try {
              var e = pr.getStreamFromFD(r)
              return mr.close(e), 0
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return r.errno
            }
          },
          Q: function (r, e, t, n) {
            try {
              var o = ((r, e, t, n) => {
                for (var o = 0, a = 0; a < t; a++) {
                  var i = A[e >> 2],
                    s = A[(e + 4) >> 2]
                  e += 8
                  var u = mr.read(r, b, i, s, n)
                  if (u < 0) return -1
                  if (((o += u), u < s)) break
                  void 0 !== n && (n += u)
                }
                return o
              })(pr.getStreamFromFD(r), e, t)
              return (A[n >> 2] = o), 0
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return r.errno
            }
          },
          v: function (r, e, t, n, o) {
            var a = ge(e, t)
            try {
              if (isNaN(a)) return 61
              var i = pr.getStreamFromFD(r)
              return (
                mr.llseek(i, a, n),
                (Y = [
                  i.position >>> 0,
                  ((H = i.position),
                  +Math.abs(H) >= 1
                    ? H > 0
                      ? +Math.floor(H / 4294967296) >>> 0
                      : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
                    : 0),
                ]),
                (D[o >> 2] = Y[0]),
                (D[(o + 4) >> 2] = Y[1]),
                i.getdents && 0 === a && 0 === n && (i.getdents = null),
                0
              )
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return r.errno
            }
          },
          m: function (r, e, t, n) {
            try {
              var o = ((r, e, t, n) => {
                for (var o = 0, a = 0; a < t; a++) {
                  var i = A[e >> 2],
                    s = A[(e + 4) >> 2]
                  e += 8
                  var u = mr.write(r, b, i, s, n)
                  if (u < 0) return -1
                  ;(o += u), void 0 !== n && (n += u)
                }
                return o
              })(pr.getStreamFromFD(r), e, t)
              return (A[n >> 2] = o), 0
            } catch (r) {
              if (void 0 === mr || "ErrnoError" !== r.name) throw r
              return r.errno
            }
          },
          z: (r, e, t, n, o) => Te(r, e, t, n),
        },
        xe = (function () {
          var r,
            e,
            t,
            o,
            a = { a: je }
          function i(r, e) {
            var t
            return (xe = r.exports), (y = xe.$), C(), (Br = xe.ca), (t = xe.aa), x.unshift(t), I(), xe
          }
          if ((W(), s.instantiateWasm))
            try {
              return s.instantiateWasm(a, i)
            } catch (r) {
              _(`Module.instantiateWasm callback failed with error: ${r}`), n(r)
            }
          return (
            ((r = w),
            (e = B),
            (t = a),
            (o = function (r) {
              i(r.instance)
            }),
            r || "function" != typeof WebAssembly.instantiateStreaming || q(e) || V(e) || c || "function" != typeof fetch
              ? G(e, t, o)
              : fetch(e, { credentials: "same-origin" }).then(r =>
                  WebAssembly.instantiateStreaming(r, t).then(o, function (r) {
                    return _(`wasm streaming compile failed: ${r}`), _("falling back to ArrayBuffer instantiation"), G(e, t, o)
                  }),
                )).catch(n),
            {}
          )
        })(),
        Re = r => (Re = xe.ba)(r),
        Oe = r => (Oe = xe.da)(r),
        $e = r => ($e = xe.ea)(r),
        ze = r => (ze = xe.fa)(r),
        Ne = (r, e) => (Ne = xe.ga)(r, e),
        We = () => (We = xe.ha)()
      ;(s.dynCall_viijii = (r, e, t, n, o, a, i) => (s.dynCall_viijii = xe.ia)(r, e, t, n, o, a, i)),
        (s.dynCall_viiiiji = (r, e, t, n, o, a, i, u) => (s.dynCall_viiiiji = xe.ja)(r, e, t, n, o, a, i, u)),
        (s.dynCall_jiji = (r, e, t, n, o) => (s.dynCall_jiji = xe.ka)(r, e, t, n, o)),
        (s.dynCall_iiiiij = (r, e, t, n, o, a, i) => (s.dynCall_iiiiij = xe.la)(r, e, t, n, o, a, i)),
        (s.dynCall_iiiiijj = (r, e, t, n, o, a, i, u, l) => (s.dynCall_iiiiijj = xe.ma)(r, e, t, n, o, a, i, u, l)),
        (s.dynCall_iiiiiijj = (r, e, t, n, o, a, i, u, l, d) => (s.dynCall_iiiiiijj = xe.na)(r, e, t, n, o, a, i, u, l, d)),
        (s.___start_em_js = 2617344),
        (s.___stop_em_js = 2617640)
      function Ie() {
        function r() {
          Ce ||
            ((Ce = !0),
            (s.calledRun = !0),
            T ||
              ((O = !0),
              s.noFSInit || mr.init.initialized || mr.init(),
              (mr.ignorePermissions = !1),
              ur.init(),
              Z(x),
              t(s),
              s.onRuntimeInitialized && s.onRuntimeInitialized(),
              (function () {
                if (s.postRun)
                  for ("function" == typeof s.postRun && (s.postRun = [s.postRun]); s.postRun.length; )
                    (r = s.postRun.shift()), R.unshift(r)
                var r
                Z(R)
              })()))
        }
        $ > 0 ||
          (!(function () {
            if (s.preRun)
              for ("function" == typeof s.preRun && (s.preRun = [s.preRun]); s.preRun.length; )
                (r = s.preRun.shift()), j.unshift(r)
            var r
            Z(j)
          })(),
          $ > 0 ||
            (s.setStatus
              ? (s.setStatus("Running..."),
                setTimeout(function () {
                  setTimeout(function () {
                    s.setStatus("")
                  }, 1),
                    r()
                }, 1))
              : r()))
      }
      if (
        ((N = function r() {
          Ce || Ie(), Ce || (N = r)
        }),
        s.preInit)
      )
        for ("function" == typeof s.preInit && (s.preInit = [s.preInit]); s.preInit.length > 0; ) s.preInit.pop()()
      return Ie(), u
    }
  )
})()

"object" == typeof exports && "object" == typeof module
  ? (module.exports = occtimportjs)
  : "function" == typeof define && define.amd && define([], () => occtimportjs)
//# sourceMappingURL=/sm/27e91d2c53a0c46e7fe4c1493a474c2f61919c58a052fff4fb9f833f4d5802c8.map
