(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{vzru:function(e,b,l){"use strict";l.r(b),l.d(b,"BuilderModule",function(){return Y});var n=l("ofXK"),i=l("tyNb"),d=l("93Pz"),t=l("suls"),o=l("fXoL"),a=l("WsYS"),c=l("I0zi"),r=l("3Pt+"),s=l("1kSV"),u=l("OtPg");const g=["form"];let X=(()=>{class e{constructor(e,b){this.layout=e,this.el=b,this.activeTabId=1}ngOnInit(){this.model=this.layout.getConfig()}setActiveTab(e){this.activeTabId=e}getActiveTabCSSClass(e){return e!==this.activeTabId?"":"active"}resetPreview(){this.layout.refreshConfigToDefault()}submitPreview(){this.layout.setConfig(this.model),location.reload()}ngAfterViewInit(){const e=this.el.nativeElement.querySelectorAll(".example");t.a.init(e)}}return e.\u0275fac=function(b){return new(b||e)(o.Sb(a.f),o.Sb(o.m))},e.\u0275cmp=o.Mb({type:e,selectors:[["app-builder"]],viewQuery:function(e,b){if(1&e&&o.Mc(g,!0),2&e){let e;o.Cc(e=o.jc())&&(b.form=e.first)}},decls:301,vars:36,consts:[[3,"svg"],[1,"card","card-custom","gutter-b"],[1,"card-header","card-header-tabs-line"],["role","tablist",1,"nav","nav-dark","nav-bold","nav-tabs","nav-tabs-line"],[1,"nav-item"],["role","tab",1,"nav-link","cursor-pointer",3,"ngClass","click"],["novalidate","",1,"form",3,"ngSubmit"],["form","ngForm"],[1,"card-body"],[1,"tab-content","pt-3"],[1,"tab-pane",3,"ngClass"],[1,"form-group","row"],[1,"col-lg-3","col-form-label","text-lg-right"],[1,"col-lg-9","col-xl-4"],[1,"switch","switch-icon"],["type","checkbox","name","builder[header][self][fixed][desktop]","value","true",3,"ngModel","ngModelChange"],[1,"form-text","text-muted"],["type","checkbox","name","builder[header][self][fixed][mobile]","value","true",3,"ngModel","ngModelChange"],["name","builder[header][self][width]",1,"form-control","form-control-solid",3,"ngModel","ngModelChange"],["value","fluid"],["value","fixed"],["type","checkbox","name","builder[header][menu][self][display]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[header][menu][self][static]","value","true",3,"ngModel","ngModelChange"],["name","builder[header][menu][self][layout]",1,"form-control","form-control-solid",3,"ngModel","ngModelChange"],["value","default"],["value","tab"],["type","checkbox","name","builder[header][menu][self][rootArrow]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[subheader][display]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[subheader][fixed]","value","true",3,"ngModel","ngModelChange"],["name","builder[subheader][width]",1,"form-control","form-control-solid",3,"ngModel","ngModelChange"],["name","builder[subheader][style]",1,"form-control","form-control-solid",3,"ngModel","ngModelChange"],["value","transparent"],["value","solid"],["name","builder[layout][subheader][layoutVersion]",1,"form-control","form-control-solid",3,"ngModel","ngModelChange"],["value","v1"],["value","v2"],["value","v3"],["value","v4"],["value","v5"],["value","v6"],["name","builder[content][width]",1,"form-control","form-control-solid",3,"ngModel","ngModelChange"],[1,"col-lg-9","col-xl-6"],["type","checkbox","name","builder[aside][self][display]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[aside][menu][static]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[aside][self][fixed]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builde[aside][self][minimize][toggle]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[aside][self][minimize][default]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[aside][menu][scroll]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[aside][menu][dropdown]","value","true",3,"ngModel","ngModelChange"],["type","checkbox","name","builder[footer][fixed]","value","true",3,"ngModel","ngModelChange"],["name","builder[footer][width]",1,"form-control","form-control-solid",3,"ngModel","ngModelChange"],[1,"row"],[1,"col-lg-4"],[1,"col-lg-8"],["type","submit","name","builder_submit",1,"btn","btn-primary"],["type","submit","name","builder_reset",1,"btn","btn-secondary",3,"click"],[1,"card-header"],[1,"card-title"],[1,"card-label"],[1,"example","mb-10"],[1,"example-code"],["data-placement","left","ngbTooltip","Copy code",1,"example-copy"],[1,"example-highlight"],[3,"highlight"]],template:function(e,b){1&e&&(o.Yb(0,"app-notice",0),o.Yb(1,"p"),o.Tc(2," The layout builder is to assist your set and configure your preferred project layout specifications and preview it in real time. The configured layout options will be saved until you change or reset them. To use the layout builder, choose the layout options and click the "),o.Yb(3,"code"),o.Tc(4,"Preview"),o.Xb(),o.Tc(5," button to preview the changes. "),o.Xb(),o.Xb(),o.Yb(6,"div",1),o.Yb(7,"div",2),o.Yb(8,"ul",3),o.Yb(9,"li",4),o.Yb(10,"a",5),o.ic("click",function(){return b.setActiveTab(1)}),o.Tc(11," Header "),o.Xb(),o.Xb(),o.Yb(12,"li",4),o.Yb(13,"a",5),o.ic("click",function(){return b.setActiveTab(2)}),o.Tc(14," Subheader "),o.Xb(),o.Xb(),o.Yb(15,"li",4),o.Yb(16,"a",5),o.ic("click",function(){return b.setActiveTab(3)}),o.Tc(17," Content "),o.Xb(),o.Xb(),o.Yb(18,"li",4),o.Yb(19,"a",5),o.ic("click",function(){return b.setActiveTab(4)}),o.Tc(20," Aside "),o.Xb(),o.Xb(),o.Yb(21,"li",4),o.Yb(22,"a",5),o.ic("click",function(){return b.setActiveTab(5)}),o.Tc(23," Footer "),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Yb(24,"form",6,7),o.ic("ngSubmit",function(){return b.submitPreview()}),o.Yb(26,"div",8),o.Yb(27,"div",9),o.Yb(28,"div",10),o.Yb(29,"div",11),o.Yb(30,"label",12),o.Tc(31,"Desktop Fixed Header:"),o.Xb(),o.Yb(32,"div",13),o.Yb(33,"span",14),o.Yb(34,"label"),o.Yb(35,"input",15),o.ic("ngModelChange",function(e){return b.model.header.self.fixed.desktop=e}),o.Xb(),o.Tb(36,"span"),o.Xb(),o.Xb(),o.Yb(37,"div",16),o.Tc(38," Enable fixed header for desktop mode "),o.Xb(),o.Xb(),o.Xb(),o.Yb(39,"div",11),o.Yb(40,"label",12),o.Tc(41,"Mobile Fixed Header:"),o.Xb(),o.Yb(42,"div",13),o.Yb(43,"span",14),o.Yb(44,"label"),o.Yb(45,"input",17),o.ic("ngModelChange",function(e){return b.model.header.self.fixed.mobile=e}),o.Xb(),o.Tb(46,"span"),o.Xb(),o.Xb(),o.Yb(47,"div",16),o.Tc(48," Enable fixed header for mobile mode "),o.Xb(),o.Xb(),o.Xb(),o.Yb(49,"div",11),o.Yb(50,"label",12),o.Tc(51,"Header Width:"),o.Xb(),o.Yb(52,"div",13),o.Yb(53,"select",18),o.ic("ngModelChange",function(e){return b.model.header.self.width=e}),o.Yb(54,"option",19),o.Tc(55,"Fluid"),o.Xb(),o.Yb(56,"option",20),o.Tc(57,"Fixed"),o.Xb(),o.Xb(),o.Yb(58,"div",16),o.Tc(59,"Select header width type."),o.Xb(),o.Xb(),o.Xb(),o.Yb(60,"div",11),o.Yb(61,"label",12),o.Tc(62,"Display Header Menu:"),o.Xb(),o.Yb(63,"div",13),o.Yb(64,"span",14),o.Yb(65,"label"),o.Yb(66,"input",21),o.ic("ngModelChange",function(e){return b.model.header.menu.self.display=e}),o.Xb(),o.Tb(67,"span"),o.Xb(),o.Xb(),o.Yb(68,"div",16),o.Tc(69,"Display header menu"),o.Xb(),o.Xb(),o.Xb(),o.Yb(70,"div",11),o.Yb(71,"label",12),o.Tc(72,"Static Header Menu:"),o.Xb(),o.Yb(73,"div",13),o.Yb(74,"span",14),o.Yb(75,"label"),o.Yb(76,"input",22),o.ic("ngModelChange",function(e){return b.model.header.menu.self.static=e}),o.Xb(),o.Tb(77,"span"),o.Xb(),o.Xb(),o.Yb(78,"div",16),o.Tc(79,"Static header menu"),o.Xb(),o.Xb(),o.Xb(),o.Yb(80,"div",11),o.Yb(81,"label",12),o.Tc(82,"Header Menu Layout:"),o.Xb(),o.Yb(83,"div",13),o.Yb(84,"select",23),o.ic("ngModelChange",function(e){return b.model.header.menu.self.layout=e}),o.Yb(85,"option",24),o.Tc(86,"Default"),o.Xb(),o.Yb(87,"option",25),o.Tc(88,"Tab"),o.Xb(),o.Xb(),o.Yb(89,"div",16),o.Tc(90,"Select header width type."),o.Xb(),o.Xb(),o.Xb(),o.Yb(91,"div",11),o.Yb(92,"label",12),o.Tc(93,"Header Menu Arrows:"),o.Xb(),o.Yb(94,"div",13),o.Yb(95,"span",14),o.Yb(96,"label"),o.Yb(97,"input",26),o.ic("ngModelChange",function(e){return b.model.header.menu.self.rootArrow=e}),o.Xb(),o.Tb(98,"span"),o.Xb(),o.Xb(),o.Yb(99,"div",16),o.Tc(100," Enable header menu root link arrows "),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Yb(101,"div",10),o.Yb(102,"div",11),o.Yb(103,"label",12),o.Tc(104,"Display Subheader:"),o.Xb(),o.Yb(105,"div",13),o.Yb(106,"span",14),o.Yb(107,"label"),o.Yb(108,"input",27),o.ic("ngModelChange",function(e){return b.model.subheader.display=e}),o.Xb(),o.Tb(109,"span"),o.Xb(),o.Xb(),o.Yb(110,"div",16),o.Tc(111,"Display subheader"),o.Xb(),o.Xb(),o.Xb(),o.Yb(112,"div",11),o.Yb(113,"label",12),o.Tc(114,"Fixed Subheader:"),o.Xb(),o.Yb(115,"div",13),o.Yb(116,"span",14),o.Yb(117,"label"),o.Yb(118,"input",28),o.ic("ngModelChange",function(e){return b.model.subheader.fixed=e}),o.Xb(),o.Tb(119,"span"),o.Xb(),o.Xb(),o.Yb(120,"div",16),o.Tc(121," Enable fixed(sticky) subheader. Requires "),o.Yb(122,"code"),o.Tc(123,"Solid"),o.Xb(),o.Tc(124," subheader style. "),o.Xb(),o.Xb(),o.Xb(),o.Yb(125,"div",11),o.Yb(126,"label",12),o.Tc(127,"Width:"),o.Xb(),o.Yb(128,"div",13),o.Yb(129,"select",29),o.ic("ngModelChange",function(e){return b.model.subheader.width=e}),o.Yb(130,"option",19),o.Tc(131,"Fluid"),o.Xb(),o.Yb(132,"option",20),o.Tc(133,"Fixed"),o.Xb(),o.Xb(),o.Yb(134,"div",16),o.Tc(135,"Select layout width type."),o.Xb(),o.Xb(),o.Xb(),o.Yb(136,"div",11),o.Yb(137,"label",12),o.Tc(138,"Subheader Style:"),o.Xb(),o.Yb(139,"div",13),o.Yb(140,"select",30),o.ic("ngModelChange",function(e){return b.model.subheader.style=e}),o.Yb(141,"option",31),o.Tc(142,"Transparent"),o.Xb(),o.Yb(143,"option",32),o.Tc(144,"Solid"),o.Xb(),o.Xb(),o.Yb(145,"div",16),o.Tc(146,"Select subheader style"),o.Xb(),o.Xb(),o.Xb(),o.Yb(147,"div",11),o.Yb(148,"label",12),o.Tc(149,"Subheader Layout:"),o.Xb(),o.Yb(150,"div",13),o.Yb(151,"select",33),o.ic("ngModelChange",function(e){return b.model.subheader.layoutVersion=e}),o.Yb(152,"option",34),o.Tc(153,"Subheader 1"),o.Xb(),o.Yb(154,"option",35),o.Tc(155,"Subheader 2"),o.Xb(),o.Yb(156,"option",36),o.Tc(157,"Subheader 3"),o.Xb(),o.Yb(158,"option",37),o.Tc(159,"Subheader 4"),o.Xb(),o.Yb(160,"option",38),o.Tc(161,"Subheader 5"),o.Xb(),o.Yb(162,"option",39),o.Tc(163,"Subheader 6"),o.Xb(),o.Xb(),o.Yb(164,"div",16),o.Tc(165,"Select subheader layout"),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Yb(166,"div",10),o.Yb(167,"div",11),o.Yb(168,"label",12),o.Tc(169,"Width:"),o.Xb(),o.Yb(170,"div",13),o.Yb(171,"select",40),o.ic("ngModelChange",function(e){return b.model.content.width=e}),o.Yb(172,"option",19),o.Tc(173,"Fluid"),o.Xb(),o.Yb(174,"option",20),o.Tc(175,"Fixed"),o.Xb(),o.Xb(),o.Yb(176,"div",16),o.Tc(177,"Select layout width type."),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Yb(178,"div",10),o.Yb(179,"div",11),o.Yb(180,"label",12),o.Tc(181,"Display:"),o.Xb(),o.Yb(182,"div",41),o.Yb(183,"span",14),o.Yb(184,"label"),o.Yb(185,"input",42),o.ic("ngModelChange",function(e){return b.model.aside.self.display=e}),o.Xb(),o.Tb(186,"span"),o.Xb(),o.Xb(),o.Yb(187,"div",16),o.Tc(188,"Display aside"),o.Xb(),o.Xb(),o.Xb(),o.Yb(189,"div",11),o.Yb(190,"label",12),o.Tc(191,"Static aside menu:"),o.Xb(),o.Yb(192,"div",41),o.Yb(193,"span",14),o.Yb(194,"label"),o.Yb(195,"input",43),o.ic("ngModelChange",function(e){return b.model.aside.menu.static=e}),o.Xb(),o.Tb(196,"span"),o.Xb(),o.Xb(),o.Yb(197,"div",16),o.Tc(198,"Static aside menu"),o.Xb(),o.Xb(),o.Xb(),o.Yb(199,"div",11),o.Yb(200,"label",12),o.Tc(201,"Fixed:"),o.Xb(),o.Yb(202,"div",13),o.Yb(203,"span",14),o.Yb(204,"label"),o.Yb(205,"input",44),o.ic("ngModelChange",function(e){return b.model.aside.self.fixed=e}),o.Xb(),o.Tb(206,"span"),o.Xb(),o.Xb(),o.Yb(207,"div",16),o.Tc(208,"Set fixed aside layout"),o.Xb(),o.Xb(),o.Xb(),o.Yb(209,"div",11),o.Yb(210,"label",12),o.Tc(211,"Minimize:"),o.Xb(),o.Yb(212,"div",13),o.Yb(213,"span",14),o.Yb(214,"label"),o.Yb(215,"input",45),o.ic("ngModelChange",function(e){return b.model.aside.self.minimize.toggle=e}),o.Xb(),o.Tb(216,"span"),o.Xb(),o.Xb(),o.Yb(217,"div",16),o.Tc(218,"Allow aside minimizing"),o.Xb(),o.Xb(),o.Xb(),o.Yb(219,"div",11),o.Yb(220,"label",12),o.Tc(221,"Default Minimize:"),o.Xb(),o.Yb(222,"div",13),o.Yb(223,"span",14),o.Yb(224,"label"),o.Yb(225,"input",46),o.ic("ngModelChange",function(e){return b.model.aside.self.minimize.default=e}),o.Xb(),o.Tb(226,"span"),o.Xb(),o.Xb(),o.Yb(227,"div",16),o.Tc(228," Set aside minimized by default "),o.Xb(),o.Xb(),o.Xb(),o.Yb(229,"div",11),o.Yb(230,"label",12),o.Tc(231,"Scroll:"),o.Xb(),o.Yb(232,"div",13),o.Yb(233,"span",14),o.Yb(234,"label"),o.Yb(235,"input",47),o.ic("ngModelChange",function(e){return b.model.aside.menu.scroll=e}),o.Xb(),o.Tb(236,"span"),o.Xb(),o.Xb(),o.Yb(237,"div",16),o.Tc(238,"Enable aside scroll"),o.Xb(),o.Xb(),o.Xb(),o.Yb(239,"div",11),o.Yb(240,"label",12),o.Tc(241,"Submenu toggle dropdown:"),o.Xb(),o.Yb(242,"div",13),o.Yb(243,"span",14),o.Yb(244,"label"),o.Yb(245,"input",48),o.ic("ngModelChange",function(e){return b.model.aside.menu.dropdown=e}),o.Xb(),o.Tb(246,"span"),o.Xb(),o.Xb(),o.Yb(247,"div",16),o.Tc(248," Select Submenu Toggle mode (works only when "),o.Yb(249,"code"),o.Tc(250,"Scroll"),o.Xb(),o.Tc(251," is disabled. *By default - mode is 'accordion'). "),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Yb(252,"div",10),o.Yb(253,"div",11),o.Yb(254,"label",12),o.Tc(255,"Fixed Desktop Footer:"),o.Xb(),o.Yb(256,"div",13),o.Yb(257,"span",14),o.Yb(258,"label"),o.Yb(259,"input",49),o.ic("ngModelChange",function(e){return b.model.footer.fixed=e}),o.Xb(),o.Tb(260,"span"),o.Xb(),o.Xb(),o.Yb(261,"div",16),o.Tc(262,"Set fixed desktop footer"),o.Xb(),o.Xb(),o.Xb(),o.Yb(263,"div",11),o.Yb(264,"label",12),o.Tc(265,"Width:"),o.Xb(),o.Yb(266,"div",13),o.Yb(267,"select",50),o.ic("ngModelChange",function(e){return b.model.footer.width=e}),o.Yb(268,"option",19),o.Tc(269,"Fluid"),o.Xb(),o.Yb(270,"option",20),o.Tc(271,"Fixed"),o.Xb(),o.Xb(),o.Yb(272,"div",16),o.Tc(273,"Select layout width type."),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Yb(274,"div",8),o.Yb(275,"div",51),o.Tb(276,"div",52),o.Yb(277,"div",53),o.Yb(278,"button",54),o.Tc(279," Preview "),o.Xb(),o.Tc(280," \xa0 "),o.Yb(281,"button",55),o.ic("click",function(){return b.resetPreview()}),o.Tc(282," Reset "),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Yb(283,"div",1),o.Yb(284,"div",56),o.Yb(285,"div",57),o.Yb(286,"h3",58),o.Tc(287,"Generated Config"),o.Xb(),o.Xb(),o.Xb(),o.Yb(288,"div",8),o.Yb(289,"div",59),o.Yb(290,"p"),o.Tc(291," Use for layout config in "),o.Yb(292,"code"),o.Tc(293,"src/app/_metronic/configs/default-layout.config.ts"),o.Xb(),o.Xb(),o.Yb(294,"div",60),o.Yb(295,"div",60),o.Tb(296,"span",61),o.Yb(297,"div",62),o.Yb(298,"pre"),o.Tb(299,"code",63),o.nc(300,"json"),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb(),o.Xb()),2&e&&(o.tc("svg","./assets/media/svg/icons/Tools/Tools.svg"),o.Fb(10),o.tc("ngClass",b.getActiveTabCSSClass(1)),o.Fb(3),o.tc("ngClass",b.getActiveTabCSSClass(2)),o.Fb(3),o.tc("ngClass",b.getActiveTabCSSClass(3)),o.Fb(3),o.tc("ngClass",b.getActiveTabCSSClass(4)),o.Fb(3),o.tc("ngClass",b.getActiveTabCSSClass(5)),o.Fb(6),o.tc("ngClass",b.getActiveTabCSSClass(1)),o.Fb(7),o.tc("ngModel",b.model.header.self.fixed.desktop),o.Fb(10),o.tc("ngModel",b.model.header.self.fixed.mobile),o.Fb(8),o.tc("ngModel",b.model.header.self.width),o.Fb(13),o.tc("ngModel",b.model.header.menu.self.display),o.Fb(10),o.tc("ngModel",b.model.header.menu.self.static),o.Fb(8),o.tc("ngModel",b.model.header.menu.self.layout),o.Fb(13),o.tc("ngModel",b.model.header.menu.self.rootArrow),o.Fb(4),o.tc("ngClass",b.getActiveTabCSSClass(2)),o.Fb(7),o.tc("ngModel",b.model.subheader.display),o.Fb(10),o.tc("ngModel",b.model.subheader.fixed),o.Fb(11),o.tc("ngModel",b.model.subheader.width),o.Fb(11),o.tc("ngModel",b.model.subheader.style),o.Fb(11),o.tc("ngModel",b.model.subheader.layoutVersion),o.Fb(15),o.tc("ngClass",b.getActiveTabCSSClass(3)),o.Fb(5),o.tc("ngModel",b.model.content.width),o.Fb(7),o.tc("ngClass",b.getActiveTabCSSClass(4)),o.Fb(7),o.tc("ngModel",b.model.aside.self.display),o.Fb(10),o.tc("ngModel",b.model.aside.menu.static),o.Fb(10),o.tc("ngModel",b.model.aside.self.fixed),o.Fb(10),o.tc("ngModel",b.model.aside.self.minimize.toggle),o.Fb(10),o.tc("ngModel",b.model.aside.self.minimize.default),o.Fb(10),o.tc("ngModel",b.model.aside.menu.scroll),o.Fb(10),o.tc("ngModel",b.model.aside.menu.dropdown),o.Fb(7),o.tc("ngClass",b.getActiveTabCSSClass(5)),o.Fb(7),o.tc("ngModel",b.model.footer.fixed),o.Fb(8),o.tc("ngModel",b.model.footer.width),o.Fb(32),o.tc("highlight",o.oc(300,34,b.model)))},directives:[c.a,n.l,r.y,r.o,r.p,r.a,r.n,r.q,r.v,r.r,r.x,s.Y,u.b],pipes:[n.h],styles:["[_nghost-%COMP%]   .hljs[_ngcontent-%COMP%]{background:transparent!important}"]}),e})(),Y=(()=>{class e{}return e.\u0275mod=o.Qb({type:e}),e.\u0275inj=o.Pb({factory:function(b){return new(b||e)},imports:[[n.c,r.j,d.a,u.c,s.F,s.ab,i.j.forChild([{path:"",component:X}])]]}),e})()}}]);