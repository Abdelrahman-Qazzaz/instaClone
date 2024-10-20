PGDMP     6                    |         
   instaClone    15.4    15.4 -    =           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            >           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            @           1262    35371 
   instaClone    DATABASE     n   CREATE DATABASE "instaClone" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "instaClone";
                postgres    false            �            1259    35930    follows    TABLE     �   CREATE TABLE public.follows (
    follower_id integer NOT NULL,
    followed_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.follows;
       public         heap    postgres    false            �            1259    35947    posts    TABLE     �   CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    caption text,
    urls text[],
    CONSTRAINT more_than_zero_urls CHECK ((array_length(urls, 1) > 0))
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    35962    posts_comments    TABLE     $  CREATE TABLE public.posts_comments (
    id integer NOT NULL,
    parent_id integer,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    caption text,
    urls text[],
    CONSTRAINT more_than_zero_urls_or_caption CHECK (((array_length(urls, 1) > 0) OR (caption IS NOT NULL)))
);
 "   DROP TABLE public.posts_comments;
       public         heap    postgres    false            �            1259    35961    posts_comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.posts_comments_id_seq;
       public          postgres    false    220            A           0    0    posts_comments_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.posts_comments_id_seq OWNED BY public.posts_comments.id;
          public          postgres    false    219            �            1259    36001    posts_comments_likes    TABLE     l   CREATE TABLE public.posts_comments_likes (
    comment_id integer NOT NULL,
    user_id integer NOT NULL
);
 (   DROP TABLE public.posts_comments_likes;
       public         heap    postgres    false            �            1259    35946    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    218            B           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    217            �            1259    35986    posts_likes    TABLE     `   CREATE TABLE public.posts_likes (
    post_id integer NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.posts_likes;
       public         heap    postgres    false            �            1259    35920    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    pfp_url text DEFAULT 'instaCloneDefaultPFP.jpg'::text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    35919    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            C           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            �           2604    35950    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    35965    posts_comments id    DEFAULT     v   ALTER TABLE ONLY public.posts_comments ALTER COLUMN id SET DEFAULT nextval('public.posts_comments_id_seq'::regclass);
 @   ALTER TABLE public.posts_comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    35923    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            4          0    35930    follows 
   TABLE DATA           G   COPY public.follows (follower_id, followed_id, created_at) FROM stdin;
    public          postgres    false    216   �6       6          0    35947    posts 
   TABLE DATA           ;   COPY public.posts (id, user_id, caption, urls) FROM stdin;
    public          postgres    false    218   �6       8          0    35962    posts_comments 
   TABLE DATA           X   COPY public.posts_comments (id, parent_id, post_id, user_id, caption, urls) FROM stdin;
    public          postgres    false    220   �6       :          0    36001    posts_comments_likes 
   TABLE DATA           C   COPY public.posts_comments_likes (comment_id, user_id) FROM stdin;
    public          postgres    false    222   �6       9          0    35986    posts_likes 
   TABLE DATA           7   COPY public.posts_likes (post_id, user_id) FROM stdin;
    public          postgres    false    221   7       3          0    35920    users 
   TABLE DATA           G   COPY public.users (id, username, email, password, pfp_url) FROM stdin;
    public          postgres    false    215   (7       D           0    0    posts_comments_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.posts_comments_id_seq', 1, false);
          public          postgres    false    219            E           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 1, false);
          public          postgres    false    217            F           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    214            �           2606    35935    follows follows_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (follower_id, followed_id);
 >   ALTER TABLE ONLY public.follows DROP CONSTRAINT follows_pkey;
       public            postgres    false    216    216            �           2606    36005 .   posts_comments_likes posts_comments_likes_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.posts_comments_likes
    ADD CONSTRAINT posts_comments_likes_pkey PRIMARY KEY (comment_id, user_id);
 X   ALTER TABLE ONLY public.posts_comments_likes DROP CONSTRAINT posts_comments_likes_pkey;
       public            postgres    false    222    222            �           2606    35970 "   posts_comments posts_comments_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.posts_comments
    ADD CONSTRAINT posts_comments_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.posts_comments DROP CONSTRAINT posts_comments_pkey;
       public            postgres    false    220            �           2606    35990    posts_likes posts_likes_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.posts_likes
    ADD CONSTRAINT posts_likes_pkey PRIMARY KEY (post_id, user_id);
 F   ALTER TABLE ONLY public.posts_likes DROP CONSTRAINT posts_likes_pkey;
       public            postgres    false    221    221            �           2606    35955    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    218            �           2606    35929    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    35927    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    35941     follows follows_followed_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_followed_id_fkey FOREIGN KEY (followed_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.follows DROP CONSTRAINT follows_followed_id_fkey;
       public          postgres    false    216    3471    215            �           2606    35936     follows follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.follows DROP CONSTRAINT follows_follower_id_fkey;
       public          postgres    false    215    216    3471            �           2606    36006 9   posts_comments_likes posts_comments_likes_comment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_comments_likes
    ADD CONSTRAINT posts_comments_likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.posts_comments(id) ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.posts_comments_likes DROP CONSTRAINT posts_comments_likes_comment_id_fkey;
       public          postgres    false    220    222    3477            �           2606    36011 6   posts_comments_likes posts_comments_likes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_comments_likes
    ADD CONSTRAINT posts_comments_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.posts_comments_likes DROP CONSTRAINT posts_comments_likes_user_id_fkey;
       public          postgres    false    222    3471    215            �           2606    35971 ,   posts_comments posts_comments_parent_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_comments
    ADD CONSTRAINT posts_comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.posts_comments(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.posts_comments DROP CONSTRAINT posts_comments_parent_id_fkey;
       public          postgres    false    220    220    3477            �           2606    35976 *   posts_comments posts_comments_post_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_comments
    ADD CONSTRAINT posts_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.posts_comments DROP CONSTRAINT posts_comments_post_id_fkey;
       public          postgres    false    220    218    3475            �           2606    35981 *   posts_comments posts_comments_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_comments
    ADD CONSTRAINT posts_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.posts_comments DROP CONSTRAINT posts_comments_user_id_fkey;
       public          postgres    false    215    3471    220            �           2606    35991 $   posts_likes posts_likes_post_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_likes
    ADD CONSTRAINT posts_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.posts_likes DROP CONSTRAINT posts_likes_post_id_fkey;
       public          postgres    false    221    3475    218            �           2606    35996 $   posts_likes posts_likes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_likes
    ADD CONSTRAINT posts_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.posts_likes DROP CONSTRAINT posts_likes_user_id_fkey;
       public          postgres    false    215    221    3471            �           2606    35956    posts posts_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_user_id_fkey;
       public          postgres    false    218    215    3471            4      x������ � �      6      x������ � �      8      x������ � �      :      x������ � �      9      x������ � �      3   r   x�3�,I-. B/9?�S�(I��@%��)��9��;4$����@/�(�%��=<��9�5�/���240��;ȴ2�#50��)3�33��$�9'?/�%5-�4�$�-@/� �+F��� ��#�     