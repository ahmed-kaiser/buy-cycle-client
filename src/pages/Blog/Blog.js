const Blog = () => {
  return (
    <section className="p-3">
      <div className="container max-w-screen-md mx-auto pt-4 pb-10">
        <h1 className="font-medium text-gray-600 text-xl border-b-2 pb-1 border-gray-100">
          Blog Post
        </h1>
        <div className="space-y-3 mt-4">
          <div>
            <h1 className="font-medium text-lg">
              <span className="h-3 w-3 bg-gray-700 inline-block rounded-full mr-2" />
              What are the different ways to manage a state in a React
              application?
            </h1>
            <div className="space-y-2">
              <p className="pl-4 indent-5">
                <b>Local State:</b> Local state is data we manage in one or
                another component. Local state is most often managed in React
                using the useState hook. For example, local state would be
                needed to show or hide a modal component or to track values for
                a form component, such as form submission, when the form is
                disabled and the values of a form's inputs.
                <br />
              </p>
              <p className="pl-4 indent-5">
                <b>Global State:</b> Global state is data we manage across
                multiple components. Global state is necessary when we want to
                get and update data anywhere in our app, or in multiple
                components at least. A common example of global state is
                authenticated user state. If a user is logged into our app, it
                is necessary to get and change their data throughout our
                application.
              </p>
              <p className="pl-4 indent-5">
                <b>Server state:</b> Data that comes from an external server
                that must be integrated with our UI state. Server state is a
                simple concept, but can be hard to manage alongside all of our
                local and global UI state. There are several pieces of state
                that must be managed every time you fetch or update data from an
                external server, including loading and error state. <br />{" "}
                Fortunately there are tools such as SWR and React Query that
                make managing server state much easier.
              </p>
              <p className="pl-4 indent-5">
                <b>URL state:</b> Data that exists on our URLs, including the
                pathname and query parameters. URL state is often missing as a
                category of state, but it is an important one. In many cases, a
                lot of major parts of our application rely upon accessing URL
                state. Try to imagine building a blog without being able to
                fetch a post based off of its slug or id that is located in the
                URL!
              </p>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-lg">
              {" "}
              <span className="h-3 w-3 bg-gray-700 inline-block rounded-full mr-2" />
              How does prototypical inheritance work?
            </h1>
            <p className="pl-4 indent-5">
              Every object in JavaScript has a built-in property, which is
              called its prototype. The prototype is itself an object, so the
              prototype will have its own prototype, making what's called a
              prototype chain. The chain ends when we reach a prototype that has
              null for its own prototype. The properties defined on the
              prototype objects are also accessible to the object instance. And
              this is the reason why we are able to access properties which we
              have not defined explicitly on an object since those are
              accessible by inheritance through the prototype chaining. <br />
              When we try to access any property of an object it is first
              checked in the own property of the object. If the property does
              not exist in the own property then the prototype object is scanned
              for that property. This continues until we get the property we are
              accessing or we reach at to the end of prototype chain giving
              undefined.
              <br />
              So, the core idea of Prototypal Inheritance is that an object can
              point to another object and inherit all its properties. The main
              purpose is to allow multiple instances of an object to share
              common properties, hence, the Singleton Pattern.
            </p>
          </div>
          <div>
            <h1 className="font-medium text-lg">
              {" "}
              <span className="h-3 w-3 bg-gray-700 inline-block rounded-full mr-2" />
              What is a unit test? Why should we write unit tests?
            </h1>
            <p className="pl-4 indent-5">
              <b>Unit Testing</b> is a type of software testing where individual
              units or components of a software are tested. The purpose is to
              validate that each unit of the software code performs as expected.
              Unit Testing is done during the development (coding phase) of an
              application by the developers. Unit Tests isolate a section of
              code and verify its correctness. A unit may be an individual
              function, method, procedure, module, or object. <br />
              As developers, we can't check every single line of code, but it is
              our job. Writing unit tests gives the developers a piece of mind
              when moving on to the next task/feature on-hand. Developers would
              rather write a unit test to confirm the behavior of code than to
              not write a unit test and have a customer discover an error in the
              system.
            </p>
          </div>
          <div>
            <h1 className="font-medium text-lg">
              {" "}
              <span className="h-3 w-3 bg-gray-700 inline-block rounded-full mr-2" />
              React vs. Angular vs. Vue?
            </h1>
            <div className="space-y-2">
              <p className="pl-4 indent-5">
                <b>React:</b> With its easy-to-learn nature, this open-source
                JavaScript Framework can help us save a significant amount of
                time since it allows us to create reusable components, in other
                words, creating packages of code to use across the entire
                application. In addition, React may also be the right framework
                choice for you since it reigns supreme when it comes to search
                engine optimization (SEO). <br />
                React.js uses a virtual DOM that only compares the previous HTML
                code differences and only loads the different parts. This
                significantly impacts the loading times. In a positive way, of
                course.
              </p>
              <p className="pl-4 indent-5">
                <b>Angular:</b> Angular is the perfect choice for those who wish
                to create refined Single Page Applications (SPA). The
                framework's two-way data binding, which automatically
                synchronizes the data between the database and the client and
                eases the development process, is another reason to prefer
                creating Angular applications. Angular is also a famously
                monolithic framework specializing in creating applications that
                combine different components into the same platform, rendering
                it an excellent choice for e-commerce sites. <br />
                Angular.js is an MVC framework. A major disadvantage of Angular
                is that it uses a regular DOM, and thus, the entire tree
                structure of the HTML tags is updated, which massively impacts
                the loading time. Angular.js has its Ionic
              </p>
              <p className="pl-4 indent-5">
                <b>Vue:</b> Vue is built from the bottom up to be progressively
                adaptable, unlike other monolithic frameworks. The core library
                focuses solely on the view layer, and it's simple to use and
                connect with other libraries or applications. This framework's
                fast learning angle is almost a trademark. It's a flexible
                framework that may be used as a library or a full-fledged
                framework for developing large web applications. <br />
                Vue.js combines the useful principles of the Angular and React
                frameworks and presents them in a minimalistic modern style. Web
                developers use Vue.js to create frontend user interfaces for
                web-based and hybrid mobile applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
