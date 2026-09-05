(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/App.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AuthPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AuthPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$IntroPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/IntroPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SignedInView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SignedInView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function App() {
    _s();
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    if (auth.session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SignedInView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            session: auth.session,
            onLogout: ()=>void auth.logout()
        }, void 0, false, {
            fileName: "[project]/src/App.tsx",
            lineNumber: 12,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$IntroPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AuthPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                mode: auth.mode,
                step: auth.step,
                name: auth.name,
                email: auth.email,
                password: auth.password,
                otp: auth.otp,
                showPassword: auth.showPassword,
                isBusy: auth.isBusy,
                error: auth.error,
                notice: auth.notice,
                onModeChange: auth.switchMode,
                onNameChange: auth.setName,
                onEmailChange: auth.setEmail,
                onPasswordChange: auth.setPassword,
                onOtpChange: auth.setOtp,
                onTogglePassword: ()=>auth.setShowPassword(!auth.showPassword),
                onSubmit: (event)=>void auth.submit(event),
                onGoogleSignIn: ()=>void auth.signInWithGoogle(),
                onVerifyOtp: (event)=>void auth.verifyOtp(event),
                onResendOtp: ()=>void auth.resendOtp()
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(App, "YuJWYXaKIY31b1y7U6yy3IXSxQA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = App;
const __TURBOPACK__default__export__ = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AuthPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function AuthPanel({ mode, step, name, email, password, otp, showPassword, isBusy, error, notice, onModeChange, onNameChange, onEmailChange, onPasswordChange, onOtpChange, onTogglePassword, onSubmit, onGoogleSignIn, onVerifyOtp, onResendOtp }) {
    const switchMode = (nextMode)=>onModeChange(nextMode);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "auth-panel",
        children: step === 'otp' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-heading",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "eyebrow",
                            children: "E-POSTA ONAYI"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 54,
                            columnNumber: 41
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Kodunu kontrol et."
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 54,
                            columnNumber: 87
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                email,
                                " adresine gönderdiğimiz 6 haneli kodu gir."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 54,
                            columnNumber: 114
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: onVerifyOtp,
                    noValidate: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Doğrulama kodu",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    inputMode: "numeric",
                                    autoComplete: "one-time-code",
                                    maxLength: 6,
                                    value: otp,
                                    onChange: (event)=>onOtpChange(event.target.value.replace(/\D/g, '')),
                                    placeholder: "123456"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthPanel.tsx",
                                    lineNumber: 56,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "form-message error",
                            role: "alert",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 57,
                            columnNumber: 23
                        }, this),
                        notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "form-message notice",
                            role: "status",
                            children: notice
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 58,
                            columnNumber: 24
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "submit-button",
                            type: "submit",
                            disabled: isBusy,
                            children: [
                                isBusy ? 'Kontrol ediliyor...' : 'E-postayı doğrula',
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthPanel.tsx",
                                    lineNumber: 59,
                                    columnNumber: 134
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "otp-actions",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onResendOtp,
                            disabled: isBusy,
                            children: "Kodu tekrar gönder"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 61,
                            columnNumber: 40
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>switchMode('register'),
                            children: "E-postayı değiştir"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 61,
                            columnNumber: 129
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AuthPanel.tsx",
            lineNumber: 53,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-heading",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "eyebrow",
                            children: "BAŞLAYALIM"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 65,
                            columnNumber: 41
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: mode === 'login' ? 'Tekrar hoş geldin.' : 'Kendi alanını aç.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 65,
                            columnNumber: 84
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: mode === 'login' ? 'Konuşmaların seni bekliyor.' : 'Birkaç saniyede ücretsiz hesabını oluştur.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 65,
                            columnNumber: 156
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "tabs",
                    role: "tablist",
                    "aria-label": "Kimlik doğrulama",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: mode === 'login' ? 'active' : '',
                            type: "button",
                            role: "tab",
                            "aria-selected": mode === 'login',
                            onClick: ()=>switchMode('login'),
                            children: "Giriş yap"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: mode === 'register' ? 'active' : '',
                            type: "button",
                            role: "tab",
                            "aria-selected": mode === 'register',
                            onClick: ()=>switchMode('register'),
                            children: "Kayıt ol"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "google-button",
                    type: "button",
                    onClick: onGoogleSignIn,
                    disabled: isBusy,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "google-mark",
                            "aria-hidden": "true",
                            children: "G"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 70,
                            columnNumber: 102
                        }, this),
                        isBusy ? 'Bekleyin...' : 'Google ile devam et'
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-divider",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "veya e-posta ile"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AuthPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 41
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: onSubmit,
                    noValidate: true,
                    children: [
                        mode === 'register' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Ad soyad",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: name,
                                    onChange: (event)=>onNameChange(event.target.value),
                                    placeholder: "Örn. Deniz Yılmaz",
                                    autoComplete: "name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthPanel.tsx",
                                    lineNumber: 73,
                                    columnNumber: 52
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 73,
                            columnNumber: 37
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "E-posta adresi",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    value: email,
                                    onChange: (event)=>onEmailChange(event.target.value),
                                    placeholder: "sen@ornek.com",
                                    autoComplete: "email"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthPanel.tsx",
                                    lineNumber: 74,
                                    columnNumber: 34
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: [
                                "Parola",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "password-field",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: showPassword ? 'text' : 'password',
                                            value: password,
                                            onChange: (event)=>onPasswordChange(event.target.value),
                                            placeholder: "En az 8 karakter",
                                            autoComplete: mode === 'login' ? 'current-password' : 'new-password'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthPanel.tsx",
                                            lineNumber: 75,
                                            columnNumber: 58
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "show-password",
                                            onClick: onTogglePassword,
                                            "aria-label": showPassword ? 'Parolayı gizle' : 'Parolayı göster',
                                            children: showPassword ? 'Gizle' : 'Göster'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthPanel.tsx",
                                            lineNumber: 75,
                                            columnNumber: 286
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthPanel.tsx",
                                    lineNumber: 75,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "form-message error",
                            role: "alert",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 76,
                            columnNumber: 23
                        }, this),
                        notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "form-message notice",
                            role: "status",
                            children: notice
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 77,
                            columnNumber: 24
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "submit-button",
                            type: "submit",
                            disabled: isBusy,
                            children: [
                                isBusy ? 'Bekleyin...' : mode === 'login' ? 'Giriş yap' : 'Hesabımı oluştur',
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthPanel.tsx",
                                    lineNumber: 78,
                                    columnNumber: 158
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthPanel.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "fine-print",
                    children: "Devam ederek kullanım koşullarımızı ve gizlilik politikamızı kabul edersin."
                }, void 0, false, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "demo-note",
                    children: "E-posta doğrulaması Supabase Auth ile korunur."
                }, void 0, false, {
                    fileName: "[project]/src/components/AuthPanel.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AuthPanel.tsx",
            lineNumber: 64,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AuthPanel.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = AuthPanel;
const __TURBOPACK__default__export__ = AuthPanel;
var _c;
__turbopack_context__.k.register(_c, "AuthPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/IntroPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function IntroPanel() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "intro-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "brand-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-mark",
                        "aria-hidden": "true",
                        children: "t"
                    }, void 0, false, {
                        fileName: "[project]/src/components/IntroPanel.tsx",
                        lineNumber: 4,
                        columnNumber: 34
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "texting"
                    }, void 0, false, {
                        fileName: "[project]/src/components/IntroPanel.tsx",
                        lineNumber: 4,
                        columnNumber: 88
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IntroPanel.tsx",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "intro-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "eyebrow",
                        children: "SÖZÜNÜN YERİ"
                    }, void 0, false, {
                        fileName: "[project]/src/components/IntroPanel.tsx",
                        lineNumber: 6,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: [
                            "Yakın olanla",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/IntroPanel.tsx",
                                lineNumber: 7,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                children: "anında"
                            }, void 0, false, {
                                fileName: "[project]/src/components/IntroPanel.tsx",
                                lineNumber: 7,
                                columnNumber: 31
                            }, this),
                            " konuş."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/IntroPanel.tsx",
                        lineNumber: 7,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Duraksamadan paylaş. Küçük anları, önemli haberleri ve aradaki her şeyi tek bir yerde tut."
                    }, void 0, false, {
                        fileName: "[project]/src/components/IntroPanel.tsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IntroPanel.tsx",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "signal",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "status-dot"
                    }, void 0, false, {
                        fileName: "[project]/src/components/IntroPanel.tsx",
                        lineNumber: 10,
                        columnNumber: 31
                    }, this),
                    " Her zaman bağlı"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/IntroPanel.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/IntroPanel.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = IntroPanel;
const __TURBOPACK__default__export__ = IntroPanel;
var _c;
__turbopack_context__.k.register(_c, "IntroPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SignedInView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function SignedInView({ session, onLogout }) {
    _s();
    const [isAccountMenuOpen, setIsAccountMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedConversationIndex, setSelectedConversationIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const accountMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignedInView.useEffect": ()=>{
            if (!isAccountMenuOpen) return;
            const closeMenu = {
                "SignedInView.useEffect.closeMenu": (event)=>{
                    if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                        setIsAccountMenuOpen(false);
                    }
                }
            }["SignedInView.useEffect.closeMenu"];
            const closeMenuWithEscape = {
                "SignedInView.useEffect.closeMenuWithEscape": (event)=>{
                    if (event.key === 'Escape') setIsAccountMenuOpen(false);
                }
            }["SignedInView.useEffect.closeMenuWithEscape"];
            document.addEventListener('mousedown', closeMenu);
            document.addEventListener('keydown', closeMenuWithEscape);
            return ({
                "SignedInView.useEffect": ()=>{
                    document.removeEventListener('mousedown', closeMenu);
                    document.removeEventListener('keydown', closeMenuWithEscape);
                }
            })["SignedInView.useEffect"];
        }
    }["SignedInView.useEffect"], [
        isAccountMenuOpen
    ]);
    const conversations = [
        {
            name: 'Ece Yılmaz',
            handle: '@eceyilmaz',
            preview: 'Sunum için son dosyayı...',
            time: '10:42',
            unread: 2,
            initials: 'EY',
            tone: 'peach',
            status: 'Şu an aktif',
            messages: [
                'Selam! Yeni sunum dosyasına bakabildin mi?',
                'Baktım, giriş bölümüne birkaç not bıraktım. Genel akış çok iyi görünüyor.',
                'Harika, teşekkürler! Son halini birazdan paylaşırım.',
                'Sunum için son dosyayı bekliyorum, sonra müşteriye iletebiliriz.'
            ]
        },
        {
            name: 'Ürün ekibi',
            handle: '4 üye',
            preview: 'Mert: Yeni akış yayında.',
            time: '09:18',
            unread: 0,
            initials: 'ÜE',
            tone: 'green',
            status: '3 kişi aktif',
            messages: [
                'Yeni akış yayında, test etmek isteyen var mı?',
                'Ben şimdi kontrol ediyorum, birkaç dakika içinde not bırakırım.',
                'Harika, özellikle mobil görünümü merak ediyorum.',
                'Akşam toplantısından önce son geri bildirimleri toplayalım.'
            ]
        },
        {
            name: 'Burak Aydın',
            handle: '@burakaydin',
            preview: 'Tamam, akşam konuşalım.',
            time: 'Dün',
            unread: 0,
            initials: 'BA',
            tone: 'blue',
            status: 'Dün aktifti',
            messages: [
                'Hafta sonu için plan kesinleşti mi?',
                'Henüz değil, hava durumuna göre karar verelim.',
                'Tamam, akşam konuşalım.',
                'Olur, sana haber veririm.'
            ]
        },
        {
            name: 'Tasarım notları',
            handle: '3 üye',
            preview: '3 kişi çevrimiçi',
            time: 'Pzt',
            unread: 0,
            initials: 'TN',
            tone: 'yellow',
            status: '3 kişi aktif',
            messages: [
                'Yeni renk paletini kanala ekledim.',
                'Başlık tipografisiyle çok iyi uyum sağlıyor.',
                'Kartların aralığını da biraz açalım.',
                'Not aldım, bir sonraki taslakta güncellerim.'
            ]
        }
    ];
    const selectedConversation = conversations[selectedConversationIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "messenger-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "conversation-sidebar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "sidebar-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "brand-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "brand-mark",
                                        "aria-hidden": "true",
                                        children: "t"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 46,
                                        columnNumber: 38
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "texting"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 46,
                                        columnNumber: 92
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "icon-button",
                                type: "button",
                                "aria-label": "Yeni mesaj",
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sidebar-title",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "eyebrow",
                                        children: "MESAJLAR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 49,
                                        columnNumber: 45
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: "Konuşmalar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 49,
                                        columnNumber: 86
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 49,
                                columnNumber: 40
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "conversation-count",
                                children: "4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 49,
                                columnNumber: 111
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "search-box",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                children: "⌕"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 50,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Konuşmalarda ara",
                                "aria-label": "Konuşmalarda ara"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 50,
                                columnNumber: 72
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "conversation-list",
                        "aria-label": "Konuşmalar",
                        children: conversations.map((conversation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `conversation-item ${index === selectedConversationIndex ? 'selected' : ''}`,
                                type: "button",
                                onClick: ()=>setSelectedConversationIndex(index),
                                "aria-pressed": index === selectedConversationIndex,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `avatar avatar-${conversation.tone}`,
                                        children: conversation.initials
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "conversation-copy",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: conversation.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 55,
                                                columnNumber: 51
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: conversation.preview
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 55,
                                                columnNumber: 87
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "conversation-meta",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: conversation.time
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 56,
                                                columnNumber: 51
                                            }, this),
                                            conversation.unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: conversation.unread
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 56,
                                                columnNumber: 113
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, conversation.name, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "profile-bar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "avatar avatar-profile",
                                children: (session.user.email?.[0] ?? 'S').toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: session.user.user_metadata?.name ?? 'Sen'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: session.user.email
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 62,
                                        columnNumber: 77
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "account-menu-wrap",
                                ref: accountMenuRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "more-button",
                                        type: "button",
                                        "aria-label": "Hesap seçenekleri",
                                        "aria-expanded": isAccountMenuOpen,
                                        onClick: ()=>setIsAccountMenuOpen((isOpen)=>!isOpen),
                                        children: "•••"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    isAccountMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "account-menu",
                                        role: "menu",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "menuitem",
                                                onClick: ()=>setIsAccountMenuOpen(false),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "◉"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SignedInView.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 99
                                                    }, this),
                                                    " Profil"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 67,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "menuitem",
                                                onClick: ()=>setIsAccountMenuOpen(false),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "⚙"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SignedInView.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 99
                                                    }, this),
                                                    " Ayarlar"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "menuitem",
                                                onClick: ()=>setIsAccountMenuOpen(false),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "◌"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SignedInView.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 99
                                                    }, this),
                                                    " Bildirimler"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "account-menu-divider"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 70,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "menu-logout",
                                                type: "button",
                                                role: "menuitem",
                                                onClick: onLogout,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "↪"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SignedInView.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 98
                                                    }, this),
                                                    " Çıkış yap"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SignedInView.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "chat-panel",
                "aria-label": `${selectedConversation.name} ile konuşma`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "chat-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chat-person",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `avatar avatar-${selectedConversation.tone}`,
                                        children: selectedConversation.initials
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 80,
                                        columnNumber: 40
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: selectedConversation.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 80,
                                                columnNumber: 146
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "online-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SignedInView.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 188
                                                    }, this),
                                                    " ",
                                                    selectedConversation.status
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SignedInView.tsx",
                                                lineNumber: 80,
                                                columnNumber: 182
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 80,
                                        columnNumber: 141
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "chat-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "icon-button",
                                        type: "button",
                                        "aria-label": "Ara",
                                        children: "⌕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 81,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "icon-button",
                                        type: "button",
                                        "aria-label": "Daha fazla seçenek",
                                        children: "•••"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 81,
                                        columnNumber: 114
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "message-area",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "day-divider",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "BUGÜN"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SignedInView.tsx",
                                    lineNumber: 84,
                                    columnNumber: 40
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            selectedConversation.messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `message-row ${index % 2 === 0 ? 'incoming' : 'outgoing'}`,
                                    children: [
                                        index % 2 === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `avatar avatar-${selectedConversation.tone} small-avatar`,
                                            children: selectedConversation.initials
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SignedInView.tsx",
                                            lineNumber: 87,
                                            columnNumber: 35
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                index === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "message-author",
                                                    children: selectedConversation.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SignedInView.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 36
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: message
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SignedInView.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 104
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                    children: [
                                                        [
                                                            '10:37',
                                                            '10:39',
                                                            '10:40',
                                                            '10:42'
                                                        ][index],
                                                        " ",
                                                        index % 2 === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "read-mark",
                                                            children: "✓✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/SignedInView.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 192
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/SignedInView.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 120
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SignedInView.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, `${selectedConversation.name}-${message}`, true, {
                                    fileName: "[project]/src/components/SignedInView.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "composer-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "composer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "composer-tool",
                                        type: "button",
                                        "aria-label": "Dosya ekle",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 92,
                                        columnNumber: 66
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        placeholder: "Bir mesaj yaz...",
                                        "aria-label": "Mesaj yaz"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 92,
                                        columnNumber: 148
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "composer-tool",
                                        type: "button",
                                        "aria-label": "Emoji ekle",
                                        children: "☺"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 92,
                                        columnNumber: 211
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "send-button",
                                        type: "button",
                                        "aria-label": "Mesaj gönder",
                                        children: "↑"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 92,
                                        columnNumber: 293
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 92,
                                columnNumber: 40
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: "Mesajların uçtan uca şifrelenir."
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 92,
                                columnNumber: 381
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SignedInView.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "details-sidebar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "details-top",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "eyebrow",
                                children: "KİŞİ BİLGİSİ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 96,
                                columnNumber: 38
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "icon-button",
                                type: "button",
                                "aria-label": "Paneli kapat",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 96,
                                columnNumber: 83
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "contact-summary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `avatar avatar-${selectedConversation.tone} large-avatar`,
                                children: selectedConversation.initials
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 97,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: selectedConversation.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 97,
                                columnNumber: 156
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: selectedConversation.handle
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 97,
                                columnNumber: 192
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "active-label",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "online-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 97,
                                        columnNumber: 259
                                    }, this),
                                    " ",
                                    selectedConversation.status
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 97,
                                columnNumber: 228
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "details-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "detail-label",
                                children: "PAYLAŞILAN MEDYA"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 98,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "media-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Sunum-v3.pdf"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 98,
                                        columnNumber: 124
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "brief-notes.docx"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 98,
                                        columnNumber: 149
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "IMG_2048.png"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SignedInView.tsx",
                                        lineNumber: 98,
                                        columnNumber: 178
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 98,
                                columnNumber: 96
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "logout-button",
                        type: "button",
                        onClick: onLogout,
                        children: [
                            "Oturumu kapat ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "↗"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SignedInView.tsx",
                                lineNumber: 99,
                                columnNumber: 90
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SignedInView.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SignedInView.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SignedInView.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(SignedInView, "f4X4frNXtxa43AU44aHSqzpLEZI=");
_c = SignedInView;
const __TURBOPACK__default__export__ = SignedInView;
var _c;
__turbopack_context__.k.register(_c, "SignedInView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/supabase.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useAuth() {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('login');
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('credentials');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBusy, setIsBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "useAuth.useEffect": ({ data })=>setSession(data.session)
            }["useAuth.useEffect"]);
            const { data: listener } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "useAuth.useEffect": (_event, nextSession)=>setSession(nextSession)
            }["useAuth.useEffect"]);
            return ({
                "useAuth.useEffect": ()=>listener.subscription.unsubscribe()
            })["useAuth.useEffect"];
        }
    }["useAuth.useEffect"], []);
    const clearMessages = ()=>{
        setError('');
        setNotice('');
    };
    const switchMode = (nextMode)=>{
        setMode(nextMode);
        setStep('credentials');
        setOtp('');
        clearMessages();
    };
    const submit = async (event)=>{
        event.preventDefault();
        clearMessages();
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
            setError('Supabase bağlantısı yapılandırılmamış. .env dosyasını oluşturun.');
            return;
        }
        const normalizedEmail = email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            setError('Geçerli bir e-posta adresi girin.');
            return;
        }
        if (password.length < 8) {
            setError('Parolanız en az 8 karakter olmalı.');
            return;
        }
        setIsBusy(true);
        if (mode === 'register') {
            if (name.trim().length < 2) {
                setError('Adınız en az 2 karakter olmalı.');
                setIsBusy(false);
                return;
            }
            const { data, error: signUpError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
                email: normalizedEmail,
                password,
                options: {
                    data: {
                        name: name.trim()
                    }
                }
            });
            setIsBusy(false);
            if (signUpError) {
                setError(signUpError.message);
                return;
            }
            if (data.session) return;
            setEmail(normalizedEmail);
            setStep('otp');
            setNotice('Doğrulama kodunu e-posta adresinize gönderdik.');
            return;
        }
        const { error: signInError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
            email: normalizedEmail,
            password
        });
        setIsBusy(false);
        if (signInError) setError('E-posta veya parola hatalı ya da e-posta henüz doğrulanmadı.');
    };
    const signInWithGoogle = async ()=>{
        clearMessages();
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSupabaseConfigured"]) {
            setError('Supabase bağlantısı yapılandırılmamış. .env dosyasını oluşturun.');
            return;
        }
        setIsBusy(true);
        const { error: googleError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
                queryParams: {
                    prompt: 'login'
                }
            }
        });
        setIsBusy(false);
        if (googleError) setError(googleError.message);
    };
    const verifyOtp = async (event)=>{
        event.preventDefault();
        clearMessages();
        if (!/^\d{6}$/.test(otp)) {
            setError('6 haneli doğrulama kodunu girin.');
            return;
        }
        setIsBusy(true);
        const { error: verifyError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.verifyOtp({
            email,
            token: otp,
            type: 'signup'
        });
        setIsBusy(false);
        if (verifyError) setError('Kod geçersiz veya süresi dolmuş.');
    };
    const resendOtp = async ()=>{
        clearMessages();
        setIsBusy(true);
        const { error: resendError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.resend({
            type: 'signup',
            email
        });
        setIsBusy(false);
        setNotice(resendError ? '' : 'Yeni doğrulama kodu gönderildi.');
        if (resendError) setError(resendError.message);
    };
    const logout = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut({
            scope: 'global'
        });
        setMode('login');
        setStep('credentials');
        setName('');
        setEmail('');
        setPassword('');
        setOtp('');
        setShowPassword(false);
        clearMessages();
        setNotice('Oturumunuz kapatıldı.');
    };
    return {
        mode,
        step,
        name,
        email,
        password,
        otp,
        showPassword,
        isBusy,
        error,
        notice,
        session,
        switchMode,
        setName,
        setEmail,
        setPassword,
        setOtp,
        setShowPassword,
        submit,
        signInWithGoogle,
        verifyOtp,
        resendOtp,
        logout
    };
}
_s(useAuth, "Fv7w6iQkeTbd55fj3ikV6ZZO71Y=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSupabaseConfigured",
    ()=>isSupabaseConfigured,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://yuvibtdqrlmnclaenshu.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_fZLCc1yYoyPJ_Cc-XcmCQg_e2UKchMR") ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder-anon-key');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0p1vo2r._.js.map