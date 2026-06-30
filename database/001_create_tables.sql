--
-- PostgreSQL database dump
--

\restrict eshWcF6QVg5hoSJkKYlA2IgZDz4lVUtSnsmPvgHzGKUoRnGBZCUDX6a08YxamU2

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ambiente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ambiente (
    id_ambiente integer NOT NULL,
    nome character varying(50) NOT NULL
);


ALTER TABLE public.ambiente OWNER TO postgres;

--
-- Name: ambiente_id_ambiente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ambiente_id_ambiente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ambiente_id_ambiente_seq OWNER TO postgres;

--
-- Name: ambiente_id_ambiente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ambiente_id_ambiente_seq OWNED BY public.ambiente.id_ambiente;


--
-- Name: cor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cor (
    id_cor integer NOT NULL,
    nome character varying(100) NOT NULL,
    fabricante character varying(100),
    valor_chapa numeric(10,2) NOT NULL,
    foto text
);


ALTER TABLE public.cor OWNER TO postgres;

--
-- Name: cor_id_cor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cor_id_cor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cor_id_cor_seq OWNER TO postgres;

--
-- Name: cor_id_cor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cor_id_cor_seq OWNED BY public.cor.id_cor;


--
-- Name: item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item (
    id_item integer NOT NULL,
    comprimento numeric(10,2),
    altura numeric(10,2),
    largura numeric(10,2),
    foto text,
    descricao text,
    id_orcamento integer NOT NULL,
    id_movel integer NOT NULL,
    id_cor integer NOT NULL,
    valor_estimado numeric(10,2),
    CONSTRAINT item_altura_check CHECK (((altura IS NULL) OR (altura > (0)::numeric))),
    CONSTRAINT item_comprimento_check CHECK (((comprimento IS NULL) OR (comprimento > (0)::numeric))),
    CONSTRAINT item_largura_check CHECK (((largura IS NULL) OR (largura > (0)::numeric))),
    CONSTRAINT item_valor_estimado_check CHECK (((valor_estimado IS NULL) OR (valor_estimado >= (0)::numeric)))
);


ALTER TABLE public.item OWNER TO postgres;

--
-- Name: item_id_item_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_id_item_seq OWNER TO postgres;

--
-- Name: item_id_item_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_id_item_seq OWNED BY public.item.id_item;


--
-- Name: movel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movel (
    id_movel integer NOT NULL,
    nome character varying(100) NOT NULL,
    foto text,
    id_ambiente integer NOT NULL
);


ALTER TABLE public.movel OWNER TO postgres;

--
-- Name: movel_id_movel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movel_id_movel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movel_id_movel_seq OWNER TO postgres;

--
-- Name: movel_id_movel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movel_id_movel_seq OWNED BY public.movel.id_movel;


--
-- Name: orcamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orcamento (
    id_orcamento integer NOT NULL,
    data date DEFAULT CURRENT_DATE,
    valor numeric(10,2),
    resposta_adm text,
    id_usuario integer NOT NULL,
    id_status integer NOT NULL,
    CONSTRAINT orcamento_valor_check CHECK ((valor >= (0)::numeric))
);


ALTER TABLE public.orcamento OWNER TO postgres;

--
-- Name: orcamento_id_orcamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orcamento_id_orcamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orcamento_id_orcamento_seq OWNER TO postgres;

--
-- Name: orcamento_id_orcamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orcamento_id_orcamento_seq OWNED BY public.orcamento.id_orcamento;


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id_status integer NOT NULL,
    nome character varying(50) NOT NULL,
    cor character varying(20) NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_id_status_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_status_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_id_status_seq OWNER TO postgres;

--
-- Name: status_id_status_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_status_seq OWNED BY public.status.id_status;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    cpf character varying(14) NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(255) NOT NULL,
    tipo character varying(20) NOT NULL,
    CONSTRAINT usuario_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['ADMIN'::character varying, 'CLIENTE'::character varying])::text[])))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO postgres;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- Name: ambiente id_ambiente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ambiente ALTER COLUMN id_ambiente SET DEFAULT nextval('public.ambiente_id_ambiente_seq'::regclass);


--
-- Name: cor id_cor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cor ALTER COLUMN id_cor SET DEFAULT nextval('public.cor_id_cor_seq'::regclass);


--
-- Name: item id_item; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item ALTER COLUMN id_item SET DEFAULT nextval('public.item_id_item_seq'::regclass);


--
-- Name: movel id_movel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movel ALTER COLUMN id_movel SET DEFAULT nextval('public.movel_id_movel_seq'::regclass);


--
-- Name: orcamento id_orcamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamento ALTER COLUMN id_orcamento SET DEFAULT nextval('public.orcamento_id_orcamento_seq'::regclass);


--
-- Name: status id_status; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id_status SET DEFAULT nextval('public.status_id_status_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- Name: ambiente ambiente_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ambiente
    ADD CONSTRAINT ambiente_nome_key UNIQUE (nome);


--
-- Name: ambiente ambiente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ambiente
    ADD CONSTRAINT ambiente_pkey PRIMARY KEY (id_ambiente);


--
-- Name: cor cor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cor
    ADD CONSTRAINT cor_pkey PRIMARY KEY (id_cor);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id_item);


--
-- Name: movel movel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movel
    ADD CONSTRAINT movel_pkey PRIMARY KEY (id_movel);


--
-- Name: orcamento orcamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamento
    ADD CONSTRAINT orcamento_pkey PRIMARY KEY (id_orcamento);


--
-- Name: status status_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_nome_key UNIQUE (nome);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id_status);


--
-- Name: usuario usuario_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cpf_key UNIQUE (cpf);


--
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: item item_id_cor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_cor_fkey FOREIGN KEY (id_cor) REFERENCES public.cor(id_cor);


--
-- Name: item item_id_movel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_movel_fkey FOREIGN KEY (id_movel) REFERENCES public.movel(id_movel);


--
-- Name: item item_id_orcamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_id_orcamento_fkey FOREIGN KEY (id_orcamento) REFERENCES public.orcamento(id_orcamento);


--
-- Name: movel movel_id_ambiente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movel
    ADD CONSTRAINT movel_id_ambiente_fkey FOREIGN KEY (id_ambiente) REFERENCES public.ambiente(id_ambiente);


--
-- Name: orcamento orcamento_id_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamento
    ADD CONSTRAINT orcamento_id_status_fkey FOREIGN KEY (id_status) REFERENCES public.status(id_status);


--
-- Name: orcamento orcamento_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orcamento
    ADD CONSTRAINT orcamento_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- PostgreSQL database dump complete
--

\unrestrict eshWcF6QVg5hoSJkKYlA2IgZDz4lVUtSnsmPvgHzGKUoRnGBZCUDX6a08YxamU2

ALTER TABLE movel
DROP COLUMN foto;