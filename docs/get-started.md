# Mac Essentials

**Mac OS X** tops the most used Desktop Operating System by developers in a [Stack Overflow 2016 Developer Survey](http://stackoverflow.com/research/developer-survey-2016). For the past decade and a half, Apple's operating system has been built on top of Unix, the command-line operating system (OS) that powers much of the world's filesystems and servers.

**Unix shell** is very important for a programmer because it lets you run programs in almost any language without a specialized IDE (Integrated Development Environment). 

![Mac](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/apple.jpg)

You can run all main operating systems (like Windows and Linux) on a Mac through a virtual environment. 

You also can use **XCode**, which is the software IDE we will be using to develop iOS applications in this course.

![XCode](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/xcode.png)

**Prerequisites:**

- [Mac OSX](http://www.apple.com/mac/): Your computer
- [XCode 8.0+](https://developer.apple.com/xcode/): iOS IDE
- [Genymotion](https://www.genymotion.com/): Android emulator
- A Text Editor: ie. [Atom](https://atom.io/) or [Sublime](https://www.sublimetext.com/)

**Lesson 1 Objectives:**

- Learn a brief history of the Macintosh
- Set up your Mac for development
- Learn to use the Command Line Interface (CLI)

**Mac's Long History:**

![Mac](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/mac.png)

- Steve Jobs learned of the advanced work on graphical user interfaces (GUI) at Xerox and arranged a deal to license their designs 
- The FIRST Mac was introduced by Steve Jobs on Jan 10, 1984. 
- In 2001, Apple introduced OS X (based on Darwin and NeXTSTEP)
- MacOS is a Unix operating system that borrows from FreeBSD, therefore many apps written for Linux or BSD run on it. 

**Setting up:**

Follow the instructions [here](https://github.com/stanleycyang/perfect-mac-osx-setup/blob/master/README.md) to get your Mac ready for development.

**Command Line Interface:**

![Command Line Interface](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/terminal.png)

Command line interface is a way for us (users) to interact with the computer directly. Due to MacOSX's Unix heritage, much of the info here is also useful in other unix inspired systems, like the Linux command line.

**Opening the Command Line:**

You can simply open `Spotlight Search:`

```bash
Command ⌘ + Space bar
```

![Spotlight Search](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/spotlight.png)

Then, type in `Terminal` and press `enter`. Your command line is now open!

**Command Line Fundamentals:**

**Find out who the user is:**

```bash
$ whoami
```

![cd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/whoami.png)

**Find out what the present working directory is:**

```bash
$ pwd
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/pwd.png)

**Quickly change directories:**

```bash
$ cd ~/Desktop
```

![cd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/cd-initial.png)

The squiggle (~) denotes your user directory, for me it would be `/Users/stanley`

If you use:

```bash
$ cd /
```

![cd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/cd-slash.png)

You would end up at the root directory **/**

**To move up one directory**, you simply type:

```bash
$ cd ../
```

![cd up 1](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/cd-up.png)

**To move up two directories**, you would type: 

```bash
$ cd ../../
```

![cd up 2](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/cd-up-2.png)

So on and so forth, if you choose to go many directories up!

**To list all the files in the current directory**, type:

```bash
$ ls
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/ls.png)

**To get more detailed info about the files**, you can use a -l flag:

```bash
$ ls -l
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/ls-detailed.png)

**To make directories, type:**

```bash
$ mkdir happy gilmore
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/mkdir.png)

Now you have two folders, one called `happy` and one called `gilmore`.

**To create file(s) in those folders**:

```bash
$ touch happy/stanleysayshi.txt gilmore/stanleysaysbye.txt
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/touch.png)

**To remove those files, run**:

```bash
$ rm -rf happy/ gilmore/
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/rimraf.png)

The `-rf` flag stands for recursive with force. Be careful! The files `will be permenantly deleted`.

Let's create a new file with the help of **redirection**:

```bash
$ echo "Hello World" >> Hello.txt
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/echo.png)

`Note:` The `>>` symbols append the content to the end of the file. The `>` symbol will overwrite the content with the new content.

**Now, let's use grep to search the file for some content**.

Knowing that we have "Hello" in the Hello.txt, let's run `grep` to search for it:

```bash
$ grep Hello Hello.txt
```

![pwd](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l1/grep.png)

There are a host of other cool and useful commands to learn. Here are some useful references to improve your skills before the next lesson:

- [Mac & Terminal Cheatsheet](https://github.com/0nn0/terminal-mac-cheatsheet)
- [OS X commands](http://ss64.com/osx/)

At the end of this lesson, you should have learned:

- A brief history of the Macintosh
- How to set up your Mac for development
- How to use the Command Line Interface (CLI)

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/get-started.md). 