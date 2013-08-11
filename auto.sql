/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50141
Source Host           : localhost:3306
Source Database       : auto

Target Server Type    : MYSQL
Target Server Version : 50141
File Encoding         : 65001

Date: 2013-05-06 11:34:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `actividad`
-- ----------------------------
DROP TABLE IF EXISTS `actividad`;
CREATE TABLE `actividad` (
  `id_actividad` int(10) NOT NULL AUTO_INCREMENT,
  `id_orden` int(10) DEFAULT NULL,
  `proceso_orden` int(5) DEFAULT NULL,
  `acion_orden` int(5) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_actividad`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of actividad
-- ----------------------------
INSERT INTO `actividad` VALUES ('1', '1', '1', '1', '1', '2013-03-14 17:01:35', '1', '2013-03-14 00:00:00');

-- ----------------------------
-- Table structure for `articulo`
-- ----------------------------
DROP TABLE IF EXISTS `articulo`;
CREATE TABLE `articulo` (
  `id_articulo` int(10) NOT NULL AUTO_INCREMENT,
  `id_servicio` int(10) DEFAULT NULL,
  `nombre_servicio` varchar(500) DEFAULT NULL,
  `detalle_servicio` text,
  `precio_articulo` decimal(10,2) DEFAULT NULL,
  `precio_venta_articulo` decimal(10,2) DEFAULT NULL,
  `estado_articulo` int(3) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_articulo`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of articulo
-- ----------------------------
INSERT INTO `articulo` VALUES ('1', '2', 'Desayuno Americano', 'ddddd', '25.50', '30.50', '0', '1', '2013-04-16 22:28:30', '1', '2013-04-20 20:08:02');
INSERT INTO `articulo` VALUES ('2', '2', 'Tucumanas', 'Tucumanas', '5.00', '6.00', '1', '1', '2013-04-16 22:35:50', null, null);
INSERT INTO `articulo` VALUES ('4', '2', 'Tranca Pecho', 'Tranca pecho .... cccsdsd', '6.50', '8.50', '1', '1', '2013-04-19 18:33:58', null, null);
INSERT INTO `articulo` VALUES ('5', '2', 'Empanadas', 'Empanadas wistu pico ', '6.00', '8.00', '1', '1', '2013-04-19 20:47:47', null, '0000-00-00 00:00:00');
INSERT INTO `articulo` VALUES ('6', '2', 'Api ', 'Api como desayuno... ', '4.00', '6.00', '1', '1', '2013-04-19 20:50:26', null, null);
INSERT INTO `articulo` VALUES ('7', '2', 'Empanadas', 'Empanadas de quso ', '5.00', '7.00', '1', '1', '2013-04-19 20:52:24', null, null);
INSERT INTO `articulo` VALUES ('8', '2', 'Galletas ', 'Galletas  ', '3.00', '4.00', '1', '1', '2013-04-19 20:58:21', null, null);
INSERT INTO `articulo` VALUES ('9', '2', 'Pollo al Vino', 'Pollo al Vino ', '80.00', '100.00', '1', '1', '2013-04-19 21:07:10', null, '0000-00-00 00:00:00');
INSERT INTO `articulo` VALUES ('10', '2', 'Chicharron ', 'Chicharron ', '25.00', '35.00', '1', '1', '2013-04-19 21:09:08', null, '0000-00-00 00:00:00');
INSERT INTO `articulo` VALUES ('11', '2', 'Cafe', 'Cafe  ', '15.00', '20.00', '1', '1', '2013-04-19 21:10:19', null, '0000-00-00 00:00:00');
INSERT INTO `articulo` VALUES ('12', '3', 'Limpiado', 'limpiado de trajes ', '50.00', '60.50', '1', '1', '2013-04-24 13:06:50', null, null);
INSERT INTO `articulo` VALUES ('13', '4', 'Champagne', 'servicio de cafe en al habitacion', '5.50', '10.50', '1', '1', '2013-04-24 13:09:38', null, null);

-- ----------------------------
-- Table structure for `asigna_cliente_pieza`
-- ----------------------------
DROP TABLE IF EXISTS `asigna_cliente_pieza`;
CREATE TABLE `asigna_cliente_pieza` (
  `id_asigna_cliente_pieza` int(10) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(10) DEFAULT NULL,
  `id_pieza` int(10) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_cliente_pieza` int(2) DEFAULT NULL,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  `fecha_ingreso` date DEFAULT '0000-00-00',
  `fecha_salida` date DEFAULT '0000-00-00',
  PRIMARY KEY (`id_asigna_cliente_pieza`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of asigna_cliente_pieza
-- ----------------------------
INSERT INTO `asigna_cliente_pieza` VALUES ('1', '25', '11', '1', '2013-04-04 00:31:44', '1', null, null, '2013-04-09', '2013-04-11');
INSERT INTO `asigna_cliente_pieza` VALUES ('3', '27', '21', '1', '2013-04-09 21:41:40', '1', null, null, '2013-04-09', '2013-04-10');
INSERT INTO `asigna_cliente_pieza` VALUES ('4', '28', '20', '1', '2013-04-09 21:44:53', '0', '1', '2013-04-11 21:14:15', '2013-04-09', '2013-04-17');
INSERT INTO `asigna_cliente_pieza` VALUES ('5', '29', '21', '1', '2013-04-10 14:38:33', '1', null, null, '2013-04-10', '2013-04-11');
INSERT INTO `asigna_cliente_pieza` VALUES ('6', '30', '21', '1', '2013-04-10 14:44:04', '1', null, null, '2013-04-11', '2013-04-13');

-- ----------------------------
-- Table structure for `cliente`
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `id_cliente` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(500) DEFAULT NULL,
  `apellido_cliente` varchar(500) DEFAULT NULL,
  `ci_cliente` int(15) NOT NULL,
  `codigo_cliente` varchar(200) DEFAULT NULL,
  `email_cliente` varchar(500) DEFAULT NULL,
  `telefono_cliente` varchar(500) DEFAULT NULL,
  `direccion_cliente` text,
  `ciudad_cliente` varchar(200) DEFAULT NULL,
  `titulo_cliente` varchar(200) DEFAULT NULL,
  `id_pieza` int(10) NOT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  `estado_cliente` int(3) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES ('25', 'Juan ', 'Pacheco', '123', 'ASKI_515d1e50384de', 'juan@gmail.com', '398749283', 'Calle Brazilia # 23981', 'CBBA', 'Sr', '11', '1', '2013-04-04 00:31:44', null, null, '1');
INSERT INTO `cliente` VALUES ('27', 'German', 'Garcia', '6554233', 'ASKI_5164ca5c774b7', 'german.garcia@gmail.com', '84546313', 'Calle Juan de la Rosa ', 'STC', 'Sr', '21', '1', '2013-04-09 21:41:40', null, '0000-00-00 00:00:00', '1');
INSERT INTO `cliente` VALUES ('28', 'Juaquin', 'fernandez', '652323', 'ASKI_5164cb1dee688', 'juaquin@gmail.com', '635461532', 'Calle irigoyen ', 'STC', 'Sra', '20', '1', '2013-04-09 21:44:53', '1', '2013-04-11 21:14:15', '0');
INSERT INTO `cliente` VALUES ('29', 'Dennys', 'Gutierrez', '66542313', 'ASKI_5165b1a9744db', 'dennys@gmail.com', '84532135', 'Esta es la descripcion de los datos ', 'LP', 'Sra', '21', '1', '2013-04-10 14:38:33', null, null, '1');
INSERT INTO `cliente` VALUES ('30', 'Ruth', 'Pachecho', '6584532', 'ASKI_5165b2f46133b', 'ruth@gmail.com', '8546631', 'Calle valenzuela 66323 ', 'LP', 'Sra', '21', '1', '2013-04-10 14:44:04', null, '0000-00-00 00:00:00', '1');

-- ----------------------------
-- Table structure for `orden`
-- ----------------------------
DROP TABLE IF EXISTS `orden`;
CREATE TABLE `orden` (
  `id_orden` int(10) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(10) DEFAULT NULL,
  `numero_orden` varchar(200) DEFAULT NULL,
  `orden_total` decimal(10,0) DEFAULT NULL,
  `estado_orden` int(5) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_orden`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of orden
-- ----------------------------

-- ----------------------------
-- Table structure for `orden_detalle`
-- ----------------------------
DROP TABLE IF EXISTS `orden_detalle`;
CREATE TABLE `orden_detalle` (
  `id_orden_detalle` int(10) NOT NULL AUTO_INCREMENT,
  `id_articulo` int(10) DEFAULT NULL,
  `id_orden` int(10) DEFAULT NULL,
  `id_servicio` int(10) DEFAULT NULL,
  `nombre_producto` varchar(500) DEFAULT NULL,
  `precio_producto` decimal(10,0) DEFAULT NULL,
  `cantidad_producto` int(10) DEFAULT NULL,
  `estado_detalle` int(5) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_orden_detalle`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of orden_detalle
-- ----------------------------

-- ----------------------------
-- Table structure for `permisos`
-- ----------------------------
DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos` (
  `id_permiso` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(500) DEFAULT NULL,
  `id_usuario` int(10) DEFAULT NULL,
  `id_rol` int(10) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_permiso`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES ('1', 'Administracion', '1', '1', '1', '2013-03-15 09:56:29', null, null);

-- ----------------------------
-- Table structure for `pieza`
-- ----------------------------
DROP TABLE IF EXISTS `pieza`;
CREATE TABLE `pieza` (
  `id_pieza` int(10) NOT NULL AUTO_INCREMENT,
  `seccion_pieza` varchar(500) DEFAULT NULL,
  `codigo_pieza` varchar(500) DEFAULT NULL,
  `nombre_pieza` varchar(500) DEFAULT NULL,
  `descripcion_pieza` varchar(500) DEFAULT NULL,
  `estado_pieza` tinyint(3) NOT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_pieza`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pieza
-- ----------------------------
INSERT INTO `pieza` VALUES ('19', 'Matrimonial', 'ASKI_516227b915c5c', '2HB', 'Esta es la descripcion dela pieza', '0', '1', '2013-04-07 21:43:13', '1', '2013-04-08 11:28:08');
INSERT INTO `pieza` VALUES ('20', 'Triple', 'ASKI_5162dc822b26f', '3HB', 'Cuanta con baÃ±o balcon,tv cable,wifi', '1', '1', '2013-04-08 11:04:34', null, null);
INSERT INTO `pieza` VALUES ('21', 'Triple', 'ASKI_5162e21ca8a97', 'CabaÃ±a', ' Cuanta con wifi, tv cable', '1', '1', '2013-04-08 11:28:28', null, null);

-- ----------------------------
-- Table structure for `rol`
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `id_rol` int(10) NOT NULL AUTO_INCREMENT,
  `id_servicio` int(10) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of rol
-- ----------------------------
INSERT INTO `rol` VALUES ('1', '1', '1', '2013-03-15 09:56:56', null, null);

-- ----------------------------
-- Table structure for `servicio`
-- ----------------------------
DROP TABLE IF EXISTS `servicio`;
CREATE TABLE `servicio` (
  `id_servicio` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_servicio` varchar(500) DEFAULT NULL,
  `detalle_servicio` text,
  `codigo_servicio` varchar(5000) DEFAULT NULL,
  `estado_servicio` int(5) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_servicio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of servicio
-- ----------------------------
INSERT INTO `servicio` VALUES ('1', 'Administracion', 'Establecido como el area de administracion del HOTEL', 'ADM-SIS-001', '1', '1', '2013-03-15 09:58:39', null, null);
INSERT INTO `servicio` VALUES ('2', 'Cocina', 'Todo lo referente a bocadillos, desayunos, almuerzos, cenas', 'COS-SIS-002', '1', '1', '2013-04-16 22:32:46', null, null);
INSERT INTO `servicio` VALUES ('3', 'Lavanderia', 'Lavanderia de ropa para todo tipo de telas ', 'LAV-SIS-003', '1', '1', '2013-04-20 22:37:40', '1', '2013-04-21 00:12:23');
INSERT INTO `servicio` VALUES ('4', 'Bar', 'Cafe - bar todos los servicios de cafe bar ', 'CBAR-SIS-004', '1', '1', '2013-04-24 13:01:51', null, null);

-- ----------------------------
-- Table structure for `usuario`
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id_usuario` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(500) DEFAULT NULL,
  `apellido_usuario` varchar(500) DEFAULT NULL,
  `login_usuario` varchar(500) DEFAULT NULL,
  `contrasena_usuario` varchar(500) DEFAULT NULL,
  `email_usuario` varchar(500) DEFAULT NULL,
  `estado_usuario` int(5) DEFAULT NULL,
  `id_usuario_alta` int(10) DEFAULT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario_baja` int(10) DEFAULT NULL,
  `fecha_baja` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES ('1', 'Daniel', 'Fernandez', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'daniel.fernandez@argo-si.com', '1', '1', '2013-03-15 09:55:55', null, null);
INSERT INTO `usuario` VALUES ('2', 'gilmer', 'fernandez', 'super', 'hsadfasd', 'gilmer.fernandez@gmail.com', '1', '1', '2013-04-04 15:34:41', null, null);
