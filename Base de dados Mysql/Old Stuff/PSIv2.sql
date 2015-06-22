create database sharedpen;
use sharedpen;

SET FOREIGN_KEY_CHECKS=0;

create table alunos (
    idaluno varchar(50) NOT NULL auto_increment, 
    nome varchar(50) NOT NULL,
    avatar varchar (100) NOT NULL,
    turma varchar(50) NOT NULL,
    ano varchar(1) NOT NULL,
    escola varchar(50) NOT NULL,
    PRIMARY KEY (idaluno)) ENGINE=innodb;
    
create table externos (
    idexterno varchar(50) NOT NULL auto_increment, 
    nome varchar(50) NOT NULL,
    avatar varchar (100) NOT NULL,
    referencia varchar(50) NOT NULL,
    PRIMARY KEY (idexterno)) ENGINE=innodb;

create table admin (
    idadmin varchar (50) NOT NULL auto_increment,
    nome varchar (50) NOT NULL,
    avatar varchar (100) NOT NULL,
    PRIMARY KEY (idadmin)) ENGINE=innodb;

create table professores (
    idprofessor varchar (50) NOT NULL auto_increment,
    nome varchar (50) NOT NULL,
    avatar varchar (100) NOT NULL,
    PRIMARY KEY (idprofessor)) ENGINE=innodb;

create table projeto (
    idprojeto varchar (50) NOT NULL auto_increment,
    nome varchar (50) NOT NULL,
    id_professor varchar (50) NOT NULL,
    tipo varchar (50) NOT NULL,
    id_grupo varchar (50) NOT NULL,
    idmodelo varchar (50) NOT NULL,
    estado bool NOT NULL,
    PRIMARY KEY (idprojeto)) ENGINE=innodb;

create table grupos (
    idgrupo varchar (50) NOT NULL auto_increment,
    nome varchar (50) NOT NULL,
    idprojeto varchar (50) NOT NULL,
    idaluno varchar (50) NOT NULL,
    PRIMARY KEY (idgrupo)) ENGINE=innodb;

create table modelo (
    idmodelo varchar (50) NOT NULL auto_increment,
    nome_texto varchar (50) NOT NULL,
    htlm_texto varchar (65535) NOT NULL,
    css_texto varchar (65535) NOT NULL,
    PRIMARY KEY (idmodelo)) ENGINE=innodb;

create table escola (
    idescola varchar (50) NOT NULL auto_increment,
    nome varchar (50) NOT NULL,
    agrupamento varchar (50) NOT NULL,
    PRIMARY KEY (idescola)) ENGINE=innodb;

create table agrupamentos (
    id_agrupamento varchar (50) NOT NULL auto_increment,
    nome varchar (50) NOT NULL,
    PRIMARY KEY (id_agrupamento)) ENGINE=innodb;
    

SET FOREIGN_KEY_CHECKS=1;

